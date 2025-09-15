import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class ZohoService {
  constructor() {
    // URL base correta para Zoho Mail API
    this.baseURL = 'https://mail.zoho.com/api';
    this.accountsURL = 'https://accounts.zoho.com';
    this.accessToken = process.env.ZOHO_ACCESS_TOKEN;
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    this.clientId = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.organizationId = process.env.ZOHO_ORGANIZATION_ID;
  }

  async refreshAccessToken() {
    try {
      console.log('[ZOHO] Refreshing access token...');

      const response = await axios.post(
        `${this.accountsURL}/oauth/v2/token`,
        new URLSearchParams({
          refresh_token: this.refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'refresh_token'
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      this.accessToken = response.data.access_token;
      console.log('[ZOHO] Access token refreshed successfully');
      return this.accessToken;

    } catch (error) {
      console.error('[ZOHO] Error refreshing token:', error.response?.data || error.message);
      throw error;
    }
  }

  async makeAPICall(method, endpoint, data = null, customHeaders = {}) {
    try {
      const config = {
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...customHeaders
        }
      };

      // Log da URL para debug
      console.log(`[ZOHO] Making ${method} call to: ${config.url}`);

      if (data && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        config.data = data;
      }

      const response = await axios(config);
      return response.data;

    } catch (error) {
      if (error.response?.status === 401) {
        console.log('[ZOHO] Token expired, refreshing...');
        await this.refreshAccessToken();
        return this.makeAPICall(method, endpoint, data, customHeaders); // retry
      }

      console.error('[ZOHO] API call failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async testConnection() {
    try {
      // Use o endpoint de listar domínios para testar a conexão
      const endpoint = `/organization/${this.organizationId}/domains`;
      const response = await this.makeAPICall('GET', endpoint);
      console.log('[ZOHO] Connection successful:', response);
      return response;
    } catch (error) {
      console.error('[ZOHO] Connection failed:', error.message);
      throw error;
    }
  }
  async setupCustomerDomain(domain) {
    console.log(`[ZOHO] Setting up customer domain: ${domain}`);

    try {
      const endpoint = `/organization/${this.organizationId}/domains`;

      const domainData = await this.makeAPICall('POST', endpoint, {
        domainName: domain
      });

      console.log(`[ZOHO] Customer domain ${domain} added to organization ${this.organizationId}`);
      return domainData;

    } catch (error) {
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || error.response?.data?.status?.description || '';

        if (errorMessage.includes('already exists') || errorMessage.includes('domain already added')) {
          console.log(`[ZOHO] Domain ${domain} already exists in organization`);
          return await this.getDomainInfo(domain);
        }
      }
      throw error;
    }
  }

  async getDomainInfo(domain) {
    try {
      const endpoint = `/organization/${this.organizationId}/domains`;
      const response = await this.makeAPICall('GET', endpoint);

      const domains = response.data || response;
      const domainInfo = domains.find(d => d.domainName === domain);

      if (domainInfo) {
        return domainInfo;
      } else {
        throw new Error(`Domain ${domain} not found in organization`);
      }

    } catch (error) {
      console.error(`[ZOHO] Error getting domain info for ${domain}:`, error.message);
      throw error;
    }
  }

  async createCustomerUser(userData, domain) {
    const endpoint = `/organization/${this.organizationId}/accounts`;
    const payload = {
      primaryEmailAddress: `${userData.username}@${domain}`,
      password: userData.password,
      displayName: userData.displayName || userData.username,
      firstName: userData.firstName || userData.username,
      lastName: userData.lastName || "User"
    };
    return this.makeAPICall('POST', endpoint, payload);
  }

  async deleteCustomerUser(email) {
    const endpoint = `/organization/${this.organizationId}/accounts`;
    const payload = { emailList: [email] };
    return this.makeAPICall('DELETE', endpoint, payload);
  }

  async enableProtocols(accountId, { imap = true, pop = true, smtp = true }) {
    const endpoint = `/organization/${this.organizationId}/accounts/${accountId}/features`;
    const payload = { imap, pop, smtp };
    return this.makeAPICall('PATCH', endpoint, payload);
  }

  async getUserUsage(accountId) {
    const endpoint = `/organization/${this.organizationId}/accounts/${accountId}/usage`;
    return this.makeAPICall('GET', endpoint);
  }

  async listCustomerUsers() {
    const endpoint = `/organization/${this.organizationId}/accounts`;
    return this.makeAPICall('GET', endpoint);
  }
}

export default ZohoService;
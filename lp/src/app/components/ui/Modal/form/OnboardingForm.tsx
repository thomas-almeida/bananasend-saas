"use client"

import ModalComposition from "../ModalComposition"
import Input from "../../Form/Input"
import Select from "../../Form/Select"
import Button from "../../Button"

import { UserData } from "@/app/types/userData"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingSchema, OnboardingFormValues } from "@/app/schemas/onboardingSchema"

import React, { useState } from "react";
import { addAlias, updateOnboarding } from "@/app/services"

interface OnboardingProps {
  userData: UserData;
}

export default function OnboardingForm({ userData }: OnboardingProps) {
  const [visible, setVisible] = useState(userData.onboarding.mail == null);

  const splittedName = userData.username.split(" ")
  const firstName = splittedName[0]
  const lastName = splittedName.length > 1 ? splittedName[splittedName.length - 1] : ''

  const suggestedEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@bananasend.top`

  const handleClose = () => setVisible(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      id: userData.id,
      age: userData.onboarding.age ?? 18,
      occupation: userData.onboarding.occupation ?? '',
      mail: userData.onboarding.mail ?? '',
      linkedinUrl: userData.onboarding.linkedinUrl ?? '',
      workspace: userData.onboarding.workspace ?? '',
    }
  });

  async function onSubmit(data: OnboardingFormValues, event?: React.BaseSyntheticEvent) {
    if (event) event.preventDefault();
    console.log(data);

    if (!userData.id) {
      console.error('User ID is missing', userData.id);
      return;
    }

    const payload = {
      id: userData.id,
      age: data.age,
      occupation: data.occupation,
      mail: data.mail || "",
      linkedInUrl: data.linkedinUrl,
      workspace: data.workspace,
    }

    try {
      const updateOnboardingResponse = await updateOnboarding(payload);
      const aliasResponse = await addAlias({
        aliasEmail: payload.mail,
        userId: userData.id,
        zuid: "899565218"
      })

      if (!updateOnboardingResponse?.user) {
        throw new Error('Failed to submit onboarding data');
      }

      if (!aliasResponse?.success) {
        throw new Error('Failed to submit onboarding data');
      }

      handleClose();
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
    }
  }

  return (
    <ModalComposition visible={visible} onClose={handleClose}>
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Queremos te conhecer melhor!</h2>
          <p className="mb-4">Crie seu usuario de email e preencha algumas informações para tornar sua experiência ainda melhor e mais personalizada.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Sua idade"
              {...register("age", { valueAsNumber: true })}
            />

            <Input
              type="text"
              placeholder="Profissao"
              {...register("occupation")}
            />
          </div>
          <div>
            {errors.age && <span className="text-red-500">{errors.age.message}</span>}
            {errors.occupation && <span className="text-red-500">{errors.occupation.message}</span>}
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Url do LinkedIn"
              {...register("linkedinUrl")}
            />
            {errors.linkedinUrl && <span className="text-red-500">{errors.linkedinUrl.message}</span>}
          </div>
          <div className="relative">
            <Input
              type="email"
              placeholder={`Email BananaSend: ${suggestedEmail}`}
              {...register("mail")}
            />
            {errors.mail && <span className="text-red-500">{errors.mail.message}</span>}
          </div>
          <div>
            <Select
              options={[
                { value: 'google', label: 'Google (Gmail, Sheets, Docs)' },
                { value: 'microsoft', label: 'Microsoft (Outlook, Micrsoft 365)' },
                { value: 'ambos', label: 'Ambos (Google e Microsoft)' },
                { value: 'nenhum', label: 'Nenhum' },
              ]}
              placeholder="Workspace de Trabalho"
              {...register("workspace")}
            />
            {errors.workspace && <span className="text-red-500">{errors.workspace.message}</span>}
          </div>
          <Button
            value={isSubmitting ? "Salvando..." : "Salvar e Continuar"}
            className="w-full py-3"
            disabled={isSubmitting}
          />
          <Button
            value="Pular por enquanto"
            className="w-full py-3 border border-slate-300"
            bgColor="white"
            textColor="black"
            onClick={() => { handleClose(); }}
            type="button"
          />
        </form>
      </div>
    </ModalComposition>
  )
}
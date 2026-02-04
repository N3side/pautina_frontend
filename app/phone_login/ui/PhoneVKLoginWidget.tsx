"use client"

import { Heading } from "@/shared/styles/typography/headings"
import { PautinaText } from "@/shared/styles/typography/text"
import Card1 from "@/shared/components/Sections/Card1"
import Input from "@/shared/components/Inputs/Input"
import { Button } from "@mui/material"
import { ShadowWrapper } from "@/shared/wrappers/Shadow"
import { CheckIsNotUser } from "@/shared/providers/UserProvider"
import Link from "next/link"
import { useState, FormEvent } from "react"
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";

function VKIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796 1.033 1.203 1.66.73.98 1.304 1.813 1.473 2.389.17.576-.085.864-.576.864z" />
    </svg>
  )
}

export default function PhoneVKLoginWidget() {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    // TODO: интеграция с API — отправка кода через VK или звонок/СМС
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setError("Введите корректный номер телефона")
      return
    }
    // placeholder: здесь вызов API
  }

  return (
    <CheckIsNotUser>
      <Card1>
        <Heading variant="h4" className="font-bold text-text-main">
          Войдите, чтобы продолжить
        </Heading>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full mt-8">
          <Input
            label="Номер телефона"
            name="phone"
            placeholder="+7"
            mask="+7 (000) 000-00-00"
            defaultValue="+7 "
            error={error ?? undefined}
            onAccept={(value) => setPhone(value)}
          />

          <div className="flex flex-col gap-4">
            <ButtonLarge
              type="button"
              className="!flex !items-center !justify-center !gap-3 !py-4 !rounded-xl"
              sx={{ background: "#0077FF" }}
            >
              <VKIcon className="w-6 h-6 text-white shrink-0" />
              <PautinaText variant="button2" className="text-white font-bold">
                Получить код ВКонтакте
              </PautinaText>
            </ButtonLarge>

            <Link
              href="/otp_login"
              className="text-center"
            >
              <PautinaText
                variant="secondary"
                className="text-[#7C3AED] font-medium hover:underline"
              >
                Подтвердить через звонок или СМС
              </PautinaText>
            </Link>
          </div>
        </form>

        <p className="mt-8 text-center max-w-[340px] mx-auto">
          <PautinaText variant="tiny" className="text-text-muted">
            Подтверждая номер, вы даёте согласие на{" "}
            <Link href="/privacy" className="text-[#7C3AED] font-medium hover:underline">
              обработку персональных данных
            </Link>{" "}
            и принимаете{" "}
            <Link href="/terms" className="text-[#7C3AED] font-medium hover:underline">
              пользовательское соглашение
            </Link>
            .
          </PautinaText>
        </p>
      </Card1>
    </CheckIsNotUser>
  )
}

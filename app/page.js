"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function Component() {
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = () => {
    setIsLoading(true)
    setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const hasSpecialChar = /[!#$%^&*(),.?":{}|<>]/.test(email)
      const isLongEnough = email.length >= 8
      const allowedDomains = ["grupovanti.com", "infogrupobancolombia.com"]
      const emailDomain = email.split("@")[1]

      const isAllowedDomain = allowedDomains.includes(emailDomain)

      setIsValid(
        emailRegex.test(email) &&
        hasSpecialChar &&
        isLongEnough &&
        isAllowedDomain
      )
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Validador de Correo Electrónico</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          aria-label="Correo electrónico"
        />
        <Button onClick={validateEmail} disabled={isLoading}>
          {isLoading ? "Validando..." : "Validar"}
        </Button>
      </div>
      {isValid !== null && (
        <div
          className={`mt-4 p-3 rounded-md ${
            isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
          role="alert"
        >
          {isValid ? (
            <div className="flex items-center">
              <CheckCircle2 className="mr-2" />
              <span>El correo electrónico es seguro.</span>
            </div>
          ) : (
            <div className="flex items-center">
              <AlertCircle className="mr-2" />
              <span>El correo electrónico no es seguro. Asegúrate de que tenga al menos 8 caracteres, contenga caracteres especiales y use un dominio permitido (gmail.com, outlook.com).</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

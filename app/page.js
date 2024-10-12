"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function EmailValidator() {
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emailInfo, setEmailInfo] = useState("")

  const validateEmail = () => {
    setIsLoading(true)
    setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regex básico para el formato de correo
      const allowedDomains = {
        "grupovanti.com": {
          name: "Grupo Vanti",
          description: "Grupo Vanti es una compañía enfocada en soluciones de energía y gas en Colombia."
        },
        "infogrupobancolombia.com": {
          name: "Bancolombia",
          description: "Bancolombia es uno de los principales bancos de Colombia, ofreciendo servicios financieros a clientes corporativos y personales."
        }
      }

      const emailDomain = email.split("@")[1] // Extrae el dominio del correo
      const isValidDomain = allowedDomains[emailDomain] // Verifica si el dominio está en la lista permitida

      if (emailRegex.test(email) && isValidDomain) {
        setIsValid(true)
        setEmailInfo(allowedDomains[emailDomain].description)
      } else {
        setIsValid(false)
        setEmailInfo("El dominio del correo no es seguro o no está en la lista de dominios permitidos.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
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
              <span>El correo electrónico no es seguro. Por favor verifica el dominio.</span>
            </div>
          )}
        </div>
      )}

      {emailInfo && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
          <h3 className="font-bold">Información sobre el correo</h3>
          <p>{emailInfo}</p>
        </div>
      )}
    </div>
  )
}

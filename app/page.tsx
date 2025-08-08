"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Eye, Stethoscope } from 'lucide-react'
import ReceituarioPreview from '@/components/receituario-preview'
import { generatePDF } from "./generate-pdf"

interface FormData {
  // Dados da veterinária
  veterinarioNome: string
  veterinarioCRMV: string
  veterinarioTelefone: string
  veterinarioEndereco: string
  veterinarioCidade: string
  veterinarioUF: string
  
  // Dados do paciente
  proprietario: string
  endereco: string
  animal: string
  especie: string
  raca: string
  idade: string
  sexo: "M" | "F" | ""
  prescricao: string
  data: string
}

export default function ReceituarioGenerator() {
  const [formData, setFormData] = useState<FormData>({
    // Dados pré-preenchidos da veterinária
    veterinarioNome: "",
    veterinarioCRMV: "",
    veterinarioTelefone: "",
    veterinarioEndereco: "",
    veterinarioCidade: "",
    veterinarioUF: "",
    
    // Dados do paciente
    proprietario: "",
    endereco: "",
    animal: "",
    especie: "",
    raca: "",
    idade: "",
    sexo: "",
    prescricao: "",
    data: new Date().toISOString().split('T')[0]
  })

  const [showPreview, setShowPreview] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    
    try {
      // Se preview não estiver visível, abrir temporariamente
      const wasPreviewVisible = showPreview
      if (!wasPreviewVisible) {
        setShowPreview(true)
        // Aguardar renderização
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      await generatePDF(formData, previewRef)

      // Se preview foi aberto temporariamente, fechar
      if (!wasPreviewVisible) {
        setShowPreview(false)
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Tente novamente.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const isFormValid = formData.proprietario && formData.animal && formData.prescricao

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-green-700" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">
              Receituário Veterinário
            </h1>
          </div>
          <p className="text-sm sm:text-base text-green-600">
            Sistema para geração de receituários de controle especial
          </p>
        </div>

        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Formulário */}
          <div className="space-y-4">
            <Card className="shadow-lg border-green-200">
              <CardHeader className="bg-green-700 text-white p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Dados da Veterinária
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="veterinarioNome" className="text-green-700 text-sm font-medium">
                      Nome do Veterinário *
                    </Label>
                    <Input
                      id="veterinarioNome"
                      value={formData.veterinarioNome}
                      onChange={(e) => handleInputChange("veterinarioNome", e.target.value)}
                      className="border-green-300 focus:border-green-500 mt-1"
                      placeholder="Nome completo do veterinário"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="veterinarioCRMV" className="text-green-700 text-sm font-medium">
                        CRMV *
                      </Label>
                      <Input
                        id="veterinarioCRMV"
                        value={formData.veterinarioCRMV}
                        onChange={(e) => handleInputChange("veterinarioCRMV", e.target.value)}
                        className="border-green-300 focus:border-green-500 mt-1"
                        placeholder="CRMV-RS 0000-00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="veterinarioTelefone" className="text-green-700 text-sm font-medium">
                        Telefone
                      </Label>
                      <Input
                        id="veterinarioTelefone"
                        value={formData.veterinarioTelefone}
                        onChange={(e) => handleInputChange("veterinarioTelefone", e.target.value)}
                        className="border-green-300 focus:border-green-500 mt-1"
                        placeholder="(51) 99999-9999"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="veterinarioEndereco" className="text-green-700 text-sm font-medium">
                      Endereço
                    </Label>
                    <Input
                      id="veterinarioEndereco"
                      value={formData.veterinarioEndereco}
                      onChange={(e) => handleInputChange("veterinarioEndereco", e.target.value)}
                      className="border-green-300 focus:border-green-500 mt-1"
                      placeholder="Rua, número, bairro"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="veterinarioCidade" className="text-green-700 text-sm font-medium">
                        Cidade
                      </Label>
                      <Input
                        id="veterinarioCidade"
                        value={formData.veterinarioCidade}
                        onChange={(e) => handleInputChange("veterinarioCidade", e.target.value)}
                        className="border-green-300 focus:border-green-500 mt-1"
                        placeholder="Cidade"
                      />
                    </div>
                    <div>
                      <Label htmlFor="veterinarioUF" className="text-green-700 text-sm font-medium">
                        UF
                      </Label>
                      <Input
                        id="veterinarioUF"
                        value={formData.veterinarioUF}
                        onChange={(e) => handleInputChange("veterinarioUF", e.target.value)}
                        className="border-green-300 focus:border-green-500 mt-1"
                        placeholder="RS"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-green-200">
              <CardHeader className="bg-green-700 text-white p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Dados do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Dados do Proprietário */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-green-800 border-b border-green-200 pb-2">
                    Proprietário
                  </h3>
                  <div className="grid gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="proprietario" className="text-green-700 text-sm font-medium">
                        Nome do Proprietário *
                      </Label>
                      <Input
                        id="proprietario"
                        value={formData.proprietario}
                        onChange={(e) => handleInputChange("proprietario", e.target.value)}
                        className="border-green-300 focus:border-green-500 mt-1"
                        placeholder="Nome completo do proprietário"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endereco" className="text-green-700 text-sm font-medium">
                        Endereço
                      </Label>
                      <Input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) => handleInputChange("endereco", e.target.value)}
                        className="border-green-300 focus:border-green-500 mt-1"
                        placeholder="Endereço completo"
                      />
                    </div>
                  </div>
                </div>

                {/* Dados do Animal */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-green-800 border-b border-green-200 pb-2">
                    Animal
                  </h3>
                  <div className="grid gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="animal" className="text-green-700 text-sm font-medium">
                        Nome do Animal *
                      </Label>
                      <Input
                        id="animal"
                        value={formData.animal}
                        onChange={(e) => handleInputChange("animal", e.target.value)}
                        className="border-green-300 focus:border-green-500 mt-1"
                        placeholder="Nome do animal"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label htmlFor="especie" className="text-green-700 text-sm font-medium">
                          Espécie
                        </Label>
                        <Input
                          id="especie"
                          value={formData.especie}
                          onChange={(e) => handleInputChange("especie", e.target.value)}
                          className="border-green-300 focus:border-green-500 mt-1"
                          placeholder="Ex: Canina, Felina"
                        />
                      </div>
                      <div>
                        <Label htmlFor="raca" className="text-green-700 text-sm font-medium">
                          Raça
                        </Label>
                        <Input
                          id="raca"
                          value={formData.raca}
                          onChange={(e) => handleInputChange("raca", e.target.value)}
                          className="border-green-300 focus:border-green-500 mt-1"
                          placeholder="Raça do animal"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label htmlFor="idade" className="text-green-700 text-sm font-medium">
                          Idade
                        </Label>
                        <Input
                          id="idade"
                          value={formData.idade}
                          onChange={(e) => handleInputChange("idade", e.target.value)}
                          className="border-green-300 focus:border-green-500 mt-1"
                          placeholder="Ex: 2 anos"
                        />
                      </div>
                      <div>
                        <Label className="text-green-700 text-sm font-medium">Sexo</Label>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sexo-m"
                              checked={formData.sexo === "M"}
                              onCheckedChange={(checked) => 
                                handleInputChange("sexo", checked ? "M" : "")
                              }
                            />
                            <Label htmlFor="sexo-m" className="text-sm">Macho</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sexo-f"
                              checked={formData.sexo === "F"}
                              onCheckedChange={(checked) => 
                                handleInputChange("sexo", checked ? "F" : "")
                              }
                            />
                            <Label htmlFor="sexo-f" className="text-sm">Fêmea</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prescrição */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-green-800 border-b border-green-200 pb-2">
                    Prescrição
                  </h3>
                  <div>
                    <Label htmlFor="prescricao" className="text-green-700 text-sm font-medium">
                      Prescrição Médica *
                    </Label>
                    <Textarea
                      id="prescricao"
                      value={formData.prescricao}
                      onChange={(e) => handleInputChange("prescricao", e.target.value)}
                      className="border-green-300 focus:border-green-500 min-h-[100px] sm:min-h-[120px] mt-1"
                      placeholder="Descreva a prescrição médica veterinária..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="data" className="text-green-700 text-sm font-medium">
                      Data
                    </Label>
                    <Input
                      id="data"
                      type="date"
                      value={formData.data}
                      onChange={(e) => handleInputChange("data", e.target.value)}
                      className="border-green-300 focus:border-green-500 mt-1"
                    />
                  </div>
                </div>

                <Separator className="bg-green-200" />

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                    className="flex-1 border-green-600 text-green-700 hover:bg-green-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showPreview ? "Ocultar" : "Visualizar"} Preview
                  </Button>
                  <Button
                    onClick={handleGeneratePDF}
                    disabled={!isFormValid || isGeneratingPDF}
                    className="flex-1 bg-green-700 hover:bg-green-800 disabled:opacity-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGeneratingPDF ? "Gerando..." : "Gerar PDF"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="lg:sticky lg:top-8">
              <ReceituarioPreview ref={previewRef} data={formData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

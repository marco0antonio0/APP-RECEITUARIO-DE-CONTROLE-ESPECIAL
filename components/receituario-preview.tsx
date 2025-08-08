'use client'

import { forwardRef } from 'react'
import { Card } from '@/components/ui/card'

interface ReceituarioData {
  veterinarioNome: string
  veterinarioCRMV: string
  veterinarioTelefone: string
  veterinarioEndereco: string
  veterinarioCidade: string
  veterinarioUF: string
  proprietario: string
  endereco: string
  animal: string
  especie: string
  raca: string
  idade: string
  sexo: 'M' | 'F' | ''
  prescricao: string
  data: string
}

interface ReceituarioPreviewProps {
  data: ReceituarioData
}

const ReceituarioPreview = forwardRef<HTMLDivElement, ReceituarioPreviewProps>(
  ({ data }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return "___/___/______"
      const date = new Date(dateString)
      return date.toLocaleDateString("pt-BR")
    }

    return (
      <div 
        ref={ref} 
        className="w-[794px] mx-auto bg-white shadow-lg print:shadow-none"
        style={{
          minHeight: '1123px',
          width: '794px',
          backgroundColor: 'rgb(255, 255, 255)',
          color: 'rgb(0, 0, 0)'
        }}
      >
        <Card className="border-0 shadow-none">
          <div className="px-4 space-y-4 text-sm">
            {/* Cabeçalho */}
            <div 
              className="border-2"
              style={{ borderColor: 'rgb(22, 163, 74)' }}
            >
              <div 
                className="text-white text-center py-3"
                style={{ 
                  backgroundColor: 'rgb(22, 163, 74)',
                  color: 'rgb(255, 255, 255)'
                }}
              >
                <h1 className="text-xl font-bold">
                  RECEITUÁRIO DE CONTROLE ESPECIAL
                </h1>
              </div>
              
              <div className="flex justify-between p-4 gap-6">
                {/* Identificação do emitente */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-sm"
                      style={{ backgroundColor: 'rgb(22, 163, 74)' }}
                    >
                      <img src="/icon.svg" alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-base leading-12">{data.veterinarioNome}</div>
                      <div 
                        className="text-sm"
                        style={{ color: 'rgb(75, 85, 99)' }}
                      >
                        Médica Veterinária
                      </div>
                    </div>
                  </div>
                  <div 
                    className="text-xs space-y-1"
                    style={{ color: 'rgb(55, 65, 81)' }}
                  >
                    <div>Registro: {data.veterinarioCRMV}</div>
                    <div>Telefone: {data.veterinarioTelefone}</div>
                    <div>{data.veterinarioEndereco}</div>
                    <div>{data.veterinarioCidade} - {data.veterinarioUF}</div>
                  </div>
                </div>
                
                {/* Instruções de vias */}
                <div 
                  className="text-xs border-l pl-4"
                  style={{ borderColor: 'rgb(187, 247, 208)' }}
                >
                  <div 
                    className="font-bold mb-2"
                    style={{ color: 'rgb(22, 101, 52)' }}
                  >
                    Instruções:
                  </div>
                  <div className="space-y-1">
                    <div>1ª Via: Retenção da Farmácia ou Drogaria.</div>
                    <div>2ª Via: Orientação ao Paciente.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campos de identificação do paciente */}
            <div 
              className="border p-4"
              style={{ borderColor: 'rgb(22, 163, 74)' }}
            >
              <h3 
                className="font-bold text-sm mb-3"
                style={{ color: 'rgb(22, 101, 52)' }}
              >
                Identificação do Paciente
              </h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Proprietário:</span>
                    <div 
                      className="border-b min-h-[35px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    >
                      {data.proprietario}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Animal:</span>
                    <div 
                      className="border-b min-h-[35px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    >
                      {data.animal}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold">Endereço:</span>
                  <div 
                    className="border-b min-h-[35px] px-1 mt-1"
                    style={{ borderColor: 'rgb(156, 163, 175)' }}
                  >
                    {data.endereco}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <span className="font-semibold">Espécie:</span>
                    <div 
                      className="border-b min-h-[35px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    >
                      {data.especie}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Raça:</span>
                    <div 
                      className="border-b min-h-[35px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    >
                      {data.raca}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Idade:</span>
                    <div 
                      className="border-b min-h-[35px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    >
                      {data.idade}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Sexo:</span>
                    <div className="flex items-center space-x-3 mt-3">
                      <label className="flex items-center text-xs">
                        <span 
                          className="mr-1 w-6 h-6 border inline-block text-center leading-3"
                          style={{ borderColor: 'rgb(156, 163, 175)' }}
                        >
                          {data.sexo === 'M' ? '✓' : ''}
                        </span>
                        M
                      </label>
                      <label className="flex items-center text-xs">
                        <span 
                          className="mr-1 w-6 h-6 border inline-block text-center leading-3"
                          style={{ borderColor: 'rgb(156, 163, 175)' }}
                        >
                          {data.sexo === 'F' ? '✓' : ''}
                        </span>
                        F
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corpo da receita */}
            <div 
              className="border p-4 min-h-[150px]"
              style={{ borderColor: 'rgb(22, 163, 74)' }}
            >
              <div 
                className="font-bold text-sm mb-2"
                style={{ color: 'rgb(22, 101, 52)' }}
              >
                Prescrição:
              </div>
              <div className="whitespace-pre-wrap text-sm min-h-[100px]">
                {data.prescricao}
              </div>
            </div>

            {/* Rodapé */}
            <div className="flex justify-between items-end gap-4 mb-4">
              <div className='mb-4'>
                <span className="font-semibold text-sm">Data:</span>
                <span className="ml-2 text-sm">{formatDate(data.data)}</span>
              </div>
              <div className="text-center">
                <div 
                  className="border-t w-64 mb-1 mt-8"
                  style={{ borderColor: 'rgb(156, 163, 175)' }}
                ></div>
                <div className="text-xs">Assinatura e carimbo do Médico Veterinário</div>
              </div>
            </div>

            {/* Identificação do comprador e fornecedor */}
            <div className="grid grid-cols-2 gap-4">
              {/* Identificação do comprador */}
              <div 
                className="border p-3"
                style={{ borderColor: 'rgb(22, 163, 74)' }}
              >
                <div 
                  className="font-bold text-sm mb-2"
                  style={{ color: 'rgb(22, 101, 52)' }}
                >
                  Identificação do Comprador:
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold">Nome:</span>
                    <div 
                      className="border-b min-h-[16px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-semibold">Ident.:</span>
                      <div 
                        className="border-b min-h-[16px] px-1 mt-1"
                        style={{ borderColor: 'rgb(156, 163, 175)' }}
                      ></div>
                    </div>
                    <div>
                      <span className="font-semibold">Org. Emissor:</span>
                      <div 
                        className="border-b min-h-[16px] px-1 mt-1"
                        style={{ borderColor: 'rgb(156, 163, 175)' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">End.:</span>
                    <div 
                      className="border-b min-h-[16px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <span className="font-semibold">Cidade:</span>
                      <div 
                        className="border-b min-h-[16px] px-1 mt-1"
                        style={{ borderColor: 'rgb(156, 163, 175)' }}
                      ></div>
                    </div>
                    <div>
                      <span className="font-semibold">UF:</span>
                      <div 
                        className="border-b min-h-[16px] px-1 mt-1"
                        style={{ borderColor: 'rgb(156, 163, 175)' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Telefone:</span>
                    <div 
                      className="border-b min-h-[16px] px-1 mt-1"
                      style={{ borderColor: 'rgb(156, 163, 175)' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Identificação do fornecedor */}
              <div 
                className="border p-3"
                style={{ borderColor: 'rgb(22, 163, 74)' }}
              >
                <div 
                  className="font-bold text-sm mb-2"
                  style={{ color: 'rgb(22, 101, 52)' }}
                >
                  Identificação do Fornecedor:
                </div>
                <div 
                  className="min-h-[100px] border p-2 mb-3"
                  style={{ 
                    borderColor: 'rgb(209, 213, 219)',
                    backgroundColor: 'rgb(249, 250, 251)'
                  }}
                >
                  <div 
                    className="text-xs text-center mt-8 opacity-50"
                    style={{ color: 'rgb(107, 114, 128)' }}
                  >
                    Espaço para carimbo ou dados da farmácia/drogaria
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="border-t w-full mb-1"
                    style={{ borderColor: 'rgb(156, 163, 175)' }}
                  ></div>
                  <div className="text-xs">Assinatura do Farmacêutico</div>
                  <div className="text-xs mt-2">
                    Data: ____ / ____ / _______
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
)

ReceituarioPreview.displayName = 'ReceituarioPreview'

export default ReceituarioPreview

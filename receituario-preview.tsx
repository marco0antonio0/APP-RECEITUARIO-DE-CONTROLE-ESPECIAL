import { Card, CardContent } from "@/components/ui/card"

interface FormData {
  proprietario: string
  endereco: string
  animal: string
  especie: string
  raca: string
  idade: string
  sexo: "M" | "F" | ""
  prescricao: string
  data: string
  compradorNome: string
  compradorIdent: string
  compradorOrgEmissor: string
  compradorEndereco: string
  compradorCidade: string
  compradorUF: string
  compradorTelefone: string
}

interface ReceituarioPreviewProps {
  data: FormData
}

export function ReceituarioPreview({ data }: ReceituarioPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "___/___/______"
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <Card className="shadow-lg border-green-200 bg-white">
      <CardContent className="p-8">
        <div className="space-y-6 text-sm">
          {/* Cabeçalho */}
          <div className="text-center border-b-2 border-green-700 pb-4">
            <h1 className="text-xl font-bold text-green-800 mb-2">
              RECEITUÁRIO DE CONTROLE ESPECIAL
            </h1>
          </div>

          {/* Identificação do Emitente e Instruções */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🐕</span>
                </div>
                <div className="text-green-800 font-semibold">Dra. Ana Maria Feliz</div>
              </div>
              <div className="text-xs space-y-1 text-gray-700">
                <div>Médica Veterinária</div>
                <div>CRMV-BR 0000-00</div>
                <div>(51) 00000-0000</div>
                <div>Rua das Flores, 88 - Bairro Esplendor</div>
                <div>Feliz - RS</div>
              </div>
            </div>
            <div className="text-xs space-y-1 text-gray-700">
              <div className="font-semibold text-green-800 mb-2">Instruções de Vias:</div>
              <div>1ª Via: Retenção da Farmácia ou Drogaria.</div>
              <div>2ª Via: Orientação ao Paciente.</div>
            </div>
          </div>

          {/* Campos de Identificação do Paciente */}
          <div className="space-y-3 border border-green-300 p-4 rounded">
            <h3 className="font-semibold text-green-800 text-sm">Identificação do Paciente</h3>
            <div className="grid gap-2 text-xs">
              <div className="flex">
                <span className="font-medium w-20">Proprietário:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                  {data.proprietario || ""}
                </span>
              </div>
              <div className="flex">
                <span className="font-medium w-20">Endereço:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                  {data.endereco || ""}
                </span>
              </div>
              <div className="flex">
                <span className="font-medium w-20">Animal:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                  {data.animal || ""}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex">
                  <span className="font-medium w-16">Espécie:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                    {data.especie || ""}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium w-12">Raça:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                    {data.raca || ""}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex">
                  <span className="font-medium w-16">Idade:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                    {data.idade || ""}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">Sexo:</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1">
                      <input 
                        type="checkbox" 
                        checked={data.sexo === "M"} 
                        readOnly 
                        className="w-3 h-3"
                      />
                      <span>M</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input 
                        type="checkbox" 
                        checked={data.sexo === "F"} 
                        readOnly 
                        className="w-3 h-3"
                      />
                      <span>F</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Corpo da Receita */}
          <div className="border border-green-300 p-4 rounded min-h-[120px]">
            <h3 className="font-semibold text-green-800 text-sm mb-2">Prescrição</h3>
            <div className="text-xs whitespace-pre-wrap">
              {data.prescricao || ""}
            </div>
          </div>

          {/* Rodapé */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Data:</span>
                <span className="border-b border-gray-400 px-2 text-xs">
                  {formatDate(data.data)}
                </span>
              </div>
              <div className="text-xs">
                <div className="border-b border-gray-400 w-48 h-8 mb-1"></div>
                <div className="text-center">Assinatura e carimbo do Médico Veterinário</div>
              </div>
            </div>

            {/* Identificação do Comprador e Fornecedor */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-green-300 p-3 rounded">
                <h4 className="font-semibold text-green-800 text-xs mb-2">Identificação do Comprador</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex">
                    <span className="font-medium w-12">Nome:</span>
                    <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                      {data.compradorNome || ""}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-1">
                      <span className="font-medium w-12">Ident.:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                        {data.compradorIdent || ""}
                      </span>
                    </div>
                    <div className="flex flex-1">
                      <span className="font-medium w-16">Org. Emissor:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                        {data.compradorOrgEmissor || ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-12">End.:</span>
                    <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                      {data.compradorEndereco || ""}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-1">
                      <span className="font-medium w-12">Cidade:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                        {data.compradorCidade || ""}
                      </span>
                    </div>
                    <div className="flex w-16">
                      <span className="font-medium w-8">UF:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                        {data.compradorUF || ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-16">Telefone:</span>
                    <span className="border-b border-gray-400 flex-1 min-h-[1rem]">
                      {data.compradorTelefone || ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-green-300 p-3 rounded">
                <h4 className="font-semibold text-green-800 text-xs mb-2">Identificação do Fornecedor</h4>
                <div className="space-y-2 text-xs">
                  <div className="border border-gray-300 h-16 rounded bg-gray-50 flex items-center justify-center text-gray-500">
                    Espaço para carimbo da farmácia/drogaria
                  </div>
                  <div className="space-y-1">
                    <div className="border-b border-gray-400 h-4"></div>
                    <div className="text-center text-xs">Assinatura do Farmacêutico</div>
                    <div className="flex items-center gap-2 justify-center">
                      <span>Data:</span>
                      <span className="border-b border-gray-400 w-20 h-4"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

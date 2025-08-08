import jsPDF from 'jspdf'

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

export function generatePDF(data: FormData) {
  const pdf = new jsPDF('p', 'mm', 'a4')
  
  // Configurações
  const pageWidth = pdf.internal.pageSize.getWidth()
  const margin = 15
  const contentWidth = pageWidth - (margin * 2)
  let yPosition = 20

  // Função para adicionar texto com quebra de linha
  const addText = (text: string, x: number, y: number, options: any = {}) => {
    pdf.setFont(options.font || 'helvetica', options.style || 'normal')
    pdf.setFontSize(options.size || 10)
    pdf.text(text, x, y)
  }

  // Função para adicionar linha
  const addLine = (x1: number, y1: number, x2: number, y2: number) => {
    pdf.line(x1, y1, x2, y2)
  }

  // Função para adicionar retângulo
  const addRect = (x: number, y: number, width: number, height: number) => {
    pdf.rect(x, y, width, height)
  }

  // Cabeçalho
  addText('RECEITUÁRIO DE CONTROLE ESPECIAL', pageWidth / 2, yPosition, {
    size: 16,
    style: 'bold'
  })
  pdf.setTextColor(0, 100, 0) // Verde
  yPosition += 10
  
  // Linha separadora
  addLine(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 15
  
  pdf.setTextColor(0, 0, 0) // Preto

  // Identificação do Emitente (lado esquerdo) e Instruções (lado direito)
  const leftColumnX = margin
  const rightColumnX = pageWidth / 2 + 10
  
  // Lado esquerdo - Dados do veterinário
  addText('🐕 Dra. Ana Maria Feliz', leftColumnX, yPosition, { style: 'bold', size: 11 })
  yPosition += 5
  addText('Médico(a) Veterinário(a)', leftColumnX, yPosition, { size: 9 })
  yPosition += 4
  addText('CRMV-BR 0000-00', leftColumnX, yPosition, { size: 9 })
  yPosition += 4
  addText('(51) 00000-0000', leftColumnX, yPosition, { size: 9 })
  yPosition += 4
  addText('Rua das Flores, 88 - Bairro Esplendor', leftColumnX, yPosition, { size: 9 })
  yPosition += 4
  addText('Feliz - RS', leftColumnX, yPosition, { size: 9 })
  
  // Lado direito - Instruções
  let rightYPosition = yPosition - 25
  addText('Instruções de Vias:', rightColumnX, rightYPosition, { style: 'bold', size: 10 })
  rightYPosition += 5
  addText('1ª Via: Retenção da Farmácia ou Drogaria.', rightColumnX, rightYPosition, { size: 9 })
  rightYPosition += 4
  addText('2ª Via: Orientação ao Paciente.', rightColumnX, rightYPosition, { size: 9 })
  
  yPosition += 15

  // Campos de identificação do paciente
  addRect(margin, yPosition, contentWidth, 35)
  yPosition += 5
  addText('Identificação do Paciente', margin + 2, yPosition, { style: 'bold', size: 10 })
  yPosition += 7

  // Proprietário
  addText('Proprietário:', margin + 2, yPosition, { size: 9 })
  addLine(margin + 25, yPosition, pageWidth - margin - 2, yPosition)
  addText(data.proprietario, margin + 27, yPosition - 1, { size: 9 })
  yPosition += 6

  // Endereço
  addText('Endereço:', margin + 2, yPosition, { size: 9 })
  addLine(margin + 22, yPosition, pageWidth - margin - 2, yPosition)
  addText(data.endereco, margin + 24, yPosition - 1, { size: 9 })
  yPosition += 6

  // Animal
  addText('Animal:', margin + 2, yPosition, { size: 9 })
  addLine(margin + 18, yPosition, pageWidth - margin - 2, yPosition)
  addText(data.animal, margin + 20, yPosition - 1, { size: 9 })
  yPosition += 6

  // Espécie e Raça
  addText('Espécie:', margin + 2, yPosition, { size: 9 })
  addLine(margin + 20, yPosition, margin + 80, yPosition)
  addText(data.especie, margin + 22, yPosition - 1, { size: 9 })
  
  addText('Raça:', margin + 90, yPosition, { size: 9 })
  addLine(margin + 105, yPosition, pageWidth - margin - 2, yPosition)
  addText(data.raca, margin + 107, yPosition - 1, { size: 9 })
  yPosition += 6

  // Idade e Sexo
  addText('Idade:', margin + 2, yPosition, { size: 9 })
  addLine(margin + 17, yPosition, margin + 80, yPosition)
  addText(data.idade, margin + 19, yPosition - 1, { size: 9 })
  
  addText('Sexo:', margin + 90, yPosition, { size: 9 })
  addText('☐ M', margin + 110, yPosition, { size: 9 })
  addText('☐ F', margin + 125, yPosition, { size: 9 })
  
  // Marcar o sexo selecionado
  if (data.sexo === 'M') {
    addText('☑ M', margin + 110, yPosition, { size: 9 })
  } else if (data.sexo === 'F') {
    addText('☑ F', margin + 125, yPosition, { size: 9 })
  }
  
  yPosition += 15

  // Corpo da receita
  addRect(margin, yPosition, contentWidth, 40)
  yPosition += 5
  addText('Prescrição:', margin + 2, yPosition, { style: 'bold', size: 10 })
  yPosition += 7
  
  // Dividir a prescrição em linhas
  const prescricaoLines = pdf.splitTextToSize(data.prescricao, contentWidth - 10)
  prescricaoLines.forEach((line: string) => {
    addText(line, margin + 2, yPosition, { size: 9 })
    yPosition += 4
  })
  
  yPosition = Math.max(yPosition, yPosition + (40 - prescricaoLines.length * 4))
  yPosition += 10

  // Data e Assinatura
  const formatDate = (dateString: string) => {
    if (!dateString) return "___/___/______"
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  addText(`Data: ${formatDate(data.data)}`, margin, yPosition, { size: 10 })
  
  // Linha para assinatura
  addLine(pageWidth - margin - 80, yPosition - 2, pageWidth - margin, yPosition - 2)
  addText('Assinatura e carimbo do Médico Veterinário', pageWidth - margin - 80, yPosition + 5, { 
    size: 8 
  })
  
  yPosition += 20

  // Identificação do comprador e fornecedor
  const boxWidth = (contentWidth - 5) / 2
  
  // Comprador (lado esquerdo)
  addRect(margin, yPosition, boxWidth, 35)
  addText('Identificação do Comprador', margin + 2, yPosition + 5, { style: 'bold', size: 9 })
  
  let compradorY = yPosition + 10
  addText('Nome:', margin + 2, compradorY, { size: 8 })
  addLine(margin + 15, compradorY, margin + boxWidth - 2, compradorY)
  addText(data.compradorNome, margin + 17, compradorY - 1, { size: 8 })
  compradorY += 5
  
  addText('Ident.:', margin + 2, compradorY, { size: 8 })
  addLine(margin + 17, compradorY, margin + 60, compradorY)
  addText(data.compradorIdent, margin + 19, compradorY - 1, { size: 8 })
  
  addText('Org. Emissor:', margin + 65, compradorY, { size: 8 })
  addLine(margin + 85, compradorY, margin + boxWidth - 2, compradorY)
  addText(data.compradorOrgEmissor, margin + 87, compradorY - 1, { size: 8 })
  compradorY += 5
  
  addText('End.:', margin + 2, compradorY, { size: 8 })
  addLine(margin + 15, compradorY, margin + boxWidth - 2, compradorY)
  addText(data.compradorEndereco, margin + 17, compradorY - 1, { size: 8 })
  compradorY += 5
  
  addText('Cidade:', margin + 2, compradorY, { size: 8 })
  addLine(margin + 18, compradorY, margin + 60, compradorY)
  addText(data.compradorCidade, margin + 20, compradorY - 1, { size: 8 })
  
  addText('UF:', margin + 65, compradorY, { size: 8 })
  addLine(margin + 75, compradorY, margin + 85, compradorY)
  addText(data.compradorUF, margin + 77, compradorY - 1, { size: 8 })
  compradorY += 5
  
  addText('Telefone:', margin + 2, compradorY, { size: 8 })
  addLine(margin + 20, compradorY, margin + boxWidth - 2, compradorY)
  addText(data.compradorTelefone, margin + 22, compradorY - 1, { size: 8 })

  // Fornecedor (lado direito)
  const fornecedorX = margin + boxWidth + 5
  addRect(fornecedorX, yPosition, boxWidth, 35)
  addText('Identificação do Fornecedor', fornecedorX + 2, yPosition + 5, { style: 'bold', size: 9 })
  
  // Espaço para carimbo
  addRect(fornecedorX + 2, yPosition + 8, boxWidth - 4, 15)
  addText('Espaço para carimbo da farmácia/drogaria', fornecedorX + 10, yPosition + 17, { 
    size: 7 
  })
  
  // Assinatura do farmacêutico
  addLine(fornecedorX + 2, yPosition + 28, fornecedorX + boxWidth - 2, yPosition + 28)
  addText('Assinatura do Farmacêutico', fornecedorX + 20, yPosition + 32, { size: 8 })
  
  addText('Data: ___/___/______', fornecedorX + 30, yPosition + 37, { size: 8 })

  // Salvar o PDF
  const fileName = `receituario_${data.animal || 'animal'}_${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(fileName)
}

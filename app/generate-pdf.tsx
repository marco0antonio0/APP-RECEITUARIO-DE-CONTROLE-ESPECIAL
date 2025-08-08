import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { RefObject } from 'react'

interface FormData {
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
  sexo: "M" | "F" | ""
  prescricao: string
  data: string
}

export async function generatePDF(data: FormData, previewRef: RefObject<HTMLDivElement>) {
  if (!previewRef.current) {
    throw new Error('Preview não encontrado')
  }

  try {
    const A4_WIDTH_PX = 794 // A4 em 96dpi
    const A4_HEIGHT_PX = 1123

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: A4_WIDTH_PX,
      height: A4_HEIGHT_PX,
      windowWidth: A4_WIDTH_PX,
      windowHeight: A4_HEIGHT_PX,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const style = clonedDoc.createElement('style')
        style.textContent = `
          * {
            color: rgb(0, 0, 0) !important;
            background-color: rgb(255, 255, 255) !important;
            border-color: rgb(156, 163, 175) !important;
          }
        `
        clonedDoc.head.appendChild(style)
      }
    })

    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png', 1.0)

    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = 210
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    // 🔒 Garante que fique no limite de 297mm (A4)
    const finalHeight = Math.min(pdfHeight, 297)

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalHeight)
    pdf.save(`receituario-${data.animal || 'animal'}.pdf`)
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    throw error
  }
}

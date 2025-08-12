import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Papa from 'papaparse'

interface ExportService {
  name: string
  trustScore: number
  avgRating?: number
  fees: any
  avgResponseTime: number
  disputeWinRate: number
  minTransaction: number
  maxTransaction?: number | null
  cryptoSupported: boolean
  instantTransfer: boolean
  apiAvailable: boolean
  insuranceAmount?: number | null
  features?: string[]
}

export function exportToPDF(services: ExportService[], title = 'Escrow Service Comparison') {
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(20)
  doc.text(title, 14, 15)
  
  // Add date
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25)
  
  // Prepare table data
  const tableData = services.map(service => {
    const fee = service.fees?.buyer || service.fees?.split || {}
    return [
      service.name,
      service.trustScore.toString(),
      service.avgRating ? service.avgRating.toFixed(1) : 'N/A',
      `${fee.percentage || 0}% (min $${fee.min || 0})`,
      `${service.avgResponseTime} min`,
      `${(service.disputeWinRate * 100).toFixed(0)}%`,
      `$${service.minTransaction}`,
      service.cryptoSupported ? '✓' : '✗',
      service.instantTransfer ? '✓' : '✗',
    ]
  })
  
  // Add table
  autoTable(doc, {
    head: [['Service', 'Trust Score', 'Rating', 'Fees', 'Response', 'Dispute Win', 'Min Amount', 'Crypto', 'Instant']],
    body: tableData,
    startY: 35,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
  })
  
  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(
      `Page ${i} of ${pageCount} | EscrowCompare.io - Independent Escrow Service Comparison`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    )
  }
  
  // Save the PDF
  doc.save(`escrow-comparison-${Date.now()}.pdf`)
}

export function exportToCSV(services: ExportService[], filename = 'escrow-comparison') {
  // Prepare data for CSV
  const csvData = services.map(service => {
    const fee = service.fees?.buyer || service.fees?.split || {}
    return {
      'Service Name': service.name,
      'Trust Score': service.trustScore,
      'User Rating': service.avgRating ? service.avgRating.toFixed(1) : 'N/A',
      'Fee Percentage': fee.percentage || 0,
      'Minimum Fee': fee.min || 0,
      'Response Time (min)': service.avgResponseTime,
      'Dispute Win Rate (%)': (service.disputeWinRate * 100).toFixed(0),
      'Min Transaction ($)': service.minTransaction,
      'Max Transaction ($)': service.maxTransaction || 'Unlimited',
      'Crypto Support': service.cryptoSupported ? 'Yes' : 'No',
      'Instant Transfer': service.instantTransfer ? 'Yes' : 'No',
      'API Available': service.apiAvailable ? 'Yes' : 'No',
      'Insurance ($)': service.insuranceAmount || 'N/A',
      'Features': service.features?.join('; ') || '',
    }
  })
  
  // Convert to CSV
  const csv = Papa.unparse(csvData)
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}-${Date.now()}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function prepareComparisonData(services: any[]): ExportService[] {
  return services.map(service => ({
    name: service.name,
    trustScore: service.trustScore,
    avgRating: service.avgRating,
    fees: service.fees,
    avgResponseTime: service.avgResponseTime,
    disputeWinRate: service.disputeWinRate,
    minTransaction: service.minTransaction,
    maxTransaction: service.maxTransaction,
    cryptoSupported: service.cryptoSupported,
    instantTransfer: service.instantTransfer,
    apiAvailable: service.apiAvailable,
    insuranceAmount: service.insuranceAmount,
    features: service.features,
  }))
}
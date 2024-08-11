import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../assets/logo.png';
const generateAsistencePDF = (asistencia) => {
    const doc = new jsPDF();
    
    // Definir colores
    const primaryColor = '#5023A7';
    const secondaryColor = '#FE8D32';
    const tertiaryColor = '#3F3D56';
    
    // Añadir logo
    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'PNG', 10, 10, 30, 30);
  
    // Añadir título
    doc.setFontSize(22);
    doc.setTextColor(primaryColor); // Color primario
    doc.text('Reporte de Asistencia', 105, 30, null, null, 'center');
    
    // Añadir fecha
    doc.setFontSize(12);
    doc.setTextColor(tertiaryColor); // Color terciario
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Añadir tabla de asistencia
    const tableColumn = ["Documento", "Nombre", "Teléfono", "Estado"];
    const tableRows = asistencia.map(person => [
      person.document,
      person.name,
      person.phone,
      person.status
    ]);
  
    doc.autoTable({
      startY: 55,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { 
        textColor: tertiaryColor,
        fillColor: [255, 255, 255] 
      },
      headStyles: { 
        fillColor: hexToRGB(primaryColor),
        textColor: 255 
      },
      alternateRowStyles: { 
        fillColor: hexToRGB(secondaryColor, 0.1) // 10% de opacidad
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 60 },
        2: { cellWidth: 40 },
        3: { cellWidth: 30 }
      }
    });
  
    // Añadir pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(secondaryColor); // Color secundario
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, null, null, 'center');
    }
    
    // Guardar el PDF
    doc.save(`asistencia_${new Date().toLocaleDateString()}.pdf`);
  };
  
  // Función auxiliar para convertir color hexadecimal a RGB
  const hexToRGB = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return alpha ? [r, g, b, alpha] : [r, g, b];
  };

export default generateAsistencePDF;
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { VitalReading, VITAL_THRESHOLDS } from '@/types/health';

const getVitalStatus = (reading: VitalReading): string => {
  if (reading.type === 'bloodPressure') {
    const systolic = reading.value;
    const diastolic = reading.secondaryValue || 0;
    const bp = VITAL_THRESHOLDS.bloodPressure;
    
    if (systolic >= bp.systolic.critical_high || diastolic >= bp.diastolic.critical_high) {
      return 'CRITICAL';
    }
    if (systolic >= bp.systolic.high || diastolic >= bp.diastolic.high) {
      return 'HIGH';
    }
    return 'Normal';
  }
  
  if (reading.type === 'bloodSugar') {
    const bs = VITAL_THRESHOLDS.bloodSugar;
    if (reading.value >= bs.critical_high || reading.value <= bs.critical_low) {
      return 'CRITICAL';
    }
    if (reading.value >= bs.high || reading.value < bs.normal_low) {
      return 'HIGH';
    }
    return 'Normal';
  }
  
  if (reading.type === 'cholesterol') {
    const ch = VITAL_THRESHOLDS.cholesterol;
    if (reading.value >= ch.critical_high) return 'CRITICAL';
    if (reading.value >= ch.high) return 'HIGH';
    if (reading.value >= ch.borderline) return 'Borderline';
    return 'Normal';
  }
  
  if (reading.type === 'thyroid') {
    const th = VITAL_THRESHOLDS.thyroid;
    if (reading.value >= th.critical_high || reading.value <= th.critical_low) {
      return 'CRITICAL';
    }
    if (reading.value >= th.high || reading.value < th.normal_low) {
      return 'Abnormal';
    }
    return 'Normal';
  }
  
  return 'Normal';
};

const formatValue = (reading: VitalReading): string => {
  if (reading.type === 'bloodPressure') {
    return `${reading.value}/${reading.secondaryValue} ${reading.unit}`;
  }
  if (reading.type === 'thyroid') {
    return `${reading.value.toFixed(2)} ${reading.unit}`;
  }
  return `${reading.value} ${reading.unit}`;
};

const getVitalLabel = (type: VitalReading['type']): string => {
  const labels: Record<VitalReading['type'], string> = {
    bloodPressure: 'Blood Pressure',
    bloodSugar: 'Blood Sugar',
    thyroid: 'Thyroid (TSH)',
    cholesterol: 'Cholesterol',
  };
  return labels[type];
};

export const generateHealthReport = (vitals: VitalReading[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(23, 120, 115); // Primary teal color
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Healthify', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Personal Health Report', 20, 33);
  
  // Report info
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  const reportDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Generated: ${reportDate}`, pageWidth - 20, 25, { align: 'right' });
  
  let yPosition = 55;
  
  // Summary section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(23, 120, 115);
  doc.text('Health Summary', 20, yPosition);
  yPosition += 10;
  
  // Count readings by type
  const readingCounts: Record<string, number> = {};
  vitals.forEach(v => {
    readingCounts[v.type] = (readingCounts[v.type] || 0) + 1;
  });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Total Readings: ${vitals.length}`, 20, yPosition);
  yPosition += 6;
  
  Object.entries(readingCounts).forEach(([type, count]) => {
    doc.text(`• ${getVitalLabel(type as VitalReading['type'])}: ${count} readings`, 25, yPosition);
    yPosition += 5;
  });
  
  yPosition += 10;
  
  // Group vitals by type
  const vitalTypes: VitalReading['type'][] = ['bloodPressure', 'bloodSugar', 'thyroid', 'cholesterol'];
  
  vitalTypes.forEach(type => {
    const typeVitals = vitals
      .filter(v => v.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10); // Last 10 readings
    
    if (typeVitals.length === 0) return;
    
    // Check if we need a new page
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(23, 120, 115);
    doc.text(getVitalLabel(type), 20, yPosition);
    yPosition += 8;
    
    const tableData = typeVitals.map(reading => [
      new Date(reading.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      formatValue(reading),
      getVitalStatus(reading),
      reading.notes || '-',
    ]);
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Date', 'Reading', 'Status', 'Notes']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [23, 120, 115],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 40 },
        2: { cellWidth: 30 },
        3: { cellWidth: 'auto' },
      },
      didDrawCell: (data) => {
        // Color code status column
        if (data.column.index === 2 && data.section === 'body') {
          const status = data.cell.text[0];
          if (status === 'CRITICAL') {
            doc.setTextColor(220, 53, 69);
          } else if (status === 'HIGH' || status === 'Abnormal') {
            doc.setTextColor(255, 152, 0);
          }
        }
      },
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} | Healthify - Your Personal Health Companion`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Download
  doc.save(`healthify-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

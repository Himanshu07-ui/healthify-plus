import jsPDF from 'jspdf';
import { Appointment } from '@/types/health';

export const generateInvoice = (
  appointment: Appointment,
  transactionId: string,
  patientName: string = 'Patient'
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Colors
  const primaryColor: [number, number, number] = [34, 139, 34]; // Green
  const textColor: [number, number, number] = [51, 51, 51];
  const mutedColor: [number, number, number] = [128, 128, 128];
  
  // Header Background
  doc.setFillColor(240, 255, 240);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Logo/Brand Name
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Healthify', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedColor);
  doc.text('Your Health, Our Priority', 20, 33);
  
  // Invoice Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...textColor);
  doc.text('INVOICE', pageWidth - 50, 20);
  
  // Invoice Number & Date
  const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`No: ${invoiceNumber}`, pageWidth - 50, 28);
  doc.text(`Date: ${invoiceDate}`, pageWidth - 50, 35);
  
  // Divider
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 55, pageWidth - 20, 55);
  
  // Patient & Appointment Info Section
  let yPos = 70;
  
  // Left Column - Patient Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('PATIENT DETAILS', 20, yPos);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.text(`Name: ${patientName}`, 20, yPos + 10);
  
  // Right Column - Doctor Info
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('DOCTOR DETAILS', pageWidth / 2 + 10, yPos);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  doc.text(`${appointment.doctorName}`, pageWidth / 2 + 10, yPos + 10);
  doc.text(`${appointment.specialty}`, pageWidth / 2 + 10, yPos + 18);
  
  yPos += 40;
  
  // Appointment Details Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('APPOINTMENT DETAILS', 30, yPos + 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);
  
  const appointmentDate = new Date(appointment.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  
  doc.text(`Date: ${appointmentDate}`, 30, yPos + 25);
  doc.text(`Time: ${appointment.time}`, 30, yPos + 35);
  doc.text(`Status: ${appointment.status.toUpperCase()}`, pageWidth / 2 + 10, yPos + 25);
  doc.text(`Appointment ID: ${appointment.id.slice(0, 8).toUpperCase()}`, pageWidth / 2 + 10, yPos + 35);
  
  yPos += 65;
  
  // Payment Details Table
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('PAYMENT DETAILS', 20, yPos);
  
  yPos += 10;
  
  // Table Header
  doc.setFillColor(...primaryColor);
  doc.rect(20, yPos, pageWidth - 40, 10, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Description', 25, yPos + 7);
  doc.text('Amount', pageWidth - 45, yPos + 7);
  
  yPos += 10;
  
  // Table Row
  doc.setFillColor(248, 250, 252);
  doc.rect(20, yPos, pageWidth - 40, 12, 'F');
  
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  doc.text(`Consultation Fee - ${appointment.specialty}`, 25, yPos + 8);
  doc.text(`Rs. ${appointment.fee.toFixed(2)}`, pageWidth - 45, yPos + 8);
  
  yPos += 12;
  
  // Total Row
  doc.setFillColor(240, 255, 240);
  doc.rect(20, yPos, pageWidth - 40, 14, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.text('TOTAL PAID', 25, yPos + 10);
  doc.text(`Rs. ${appointment.fee.toFixed(2)}`, pageWidth - 45, yPos + 10);
  
  yPos += 25;
  
  // Transaction Details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedColor);
  doc.text(`Payment Method: UPI`, 20, yPos);
  doc.text(`Transaction ID: ${transactionId}`, 20, yPos + 8);
  doc.text(`Payment Status: PAID`, 20, yPos + 16);
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 30;
  
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(20, footerY - 10, pageWidth - 20, footerY - 10);
  
  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text('Thank you for choosing Healthify!', pageWidth / 2, footerY, { align: 'center' });
  doc.text('This is a computer-generated invoice and does not require a signature.', pageWidth / 2, footerY + 8, { align: 'center' });
  doc.text('For queries, contact: support@healthify.com', pageWidth / 2, footerY + 16, { align: 'center' });
  
  // Save the PDF
  const fileName = `Healthify_Invoice_${appointment.id.slice(0, 8)}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

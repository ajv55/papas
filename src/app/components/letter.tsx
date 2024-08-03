'use client';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenerateLetter = () => {

    const letterRef = useRef<HTMLDivElement>(null);

    const generatePDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4'); // Use A4 page size
        const marginLeft = 5;
        const marginTop = 8;
        const lineHeight = 5;
        const maxLineWidth = 198; // Max width of text in mm
        const pageHeight = doc.internal.pageSize.height - marginTop * 2;
      
        let currentLine = marginTop;
      
        const addText = (text: string, bold: boolean = false, fontSize: number = 10) => {
          doc.setFontSize(fontSize);
          if (bold) {
            doc.setFont('helvetica', 'bold');
          } else {
            doc.setFont('helvetica', 'normal');
          }
          const splitText = doc.splitTextToSize(text, maxLineWidth);
          splitText.forEach((line: string) => {
            if (currentLine + lineHeight > pageHeight) {
              doc.addPage();
              currentLine = marginTop;
            }
            doc.text(line, marginLeft, currentLine);
            currentLine += lineHeight;
          });
          currentLine += lineHeight / 2; // Add some space between paragraphs
        };
      
        const content = [
          { text: 'Abel J. Villareal', bold: true, fontSize: 14 },
          { text: 'abejevilla55@gmail.com', bold: true, fontSize: 12 },
          { text: '239 888 5428', bold: true, fontSize: 12 },
          { text: 'August 3rd, 2024', bold: true, fontSize: 12 },
          '',
          { text: 'Dear Senior Vice President of Human Resources:', bold: true, fontSize: 12 },
          '',
          { text: 'I hope this letter finds you well. My name is Abel, and I am writing to formally request reconsideration for rehire with Seminole Gaming. I am genuinely enthusiastic about the possibility of returning to contribute to the team and uphold the high standards of excellence that Seminole Gaming is renowned for.', fontSize: 10 },
          '',
          { text: 'Reason for Termination:', bold: true, fontSize: 12 },
          'My previous employment with Seminole Gaming was terminated due to personal and family health challenges. Specifically, my wife underwent surgery for a gallbladder removal, and shortly thereafter, we discovered she was five weeks pregnant with our son. This period required my full attention and support for my family, leading to my unavoidable absence and subsequent termination.',
          '',
          { text: 'What Has Changed Since My Termination:', bold: true, fontSize: 12 },
          'Since that challenging period, my personal circumstances have significantly stabilized. My wife has fully recovered from her surgery, and our son is now a healthy and active part of our family. Professionally, I have taken this time to further develop my skills and experience. I have engaged in continuous learning and professional development, which has equipped me with a broader and more refined skill set. Additionally, my experience in other roles has enhanced my problem-solving skills, attention to detail, and ability to work effectively in various environments.',
          '',
          { text: 'What Would Be Different in a Second Opportunity:', bold: true, fontSize: 12 },
          'Given a second opportunity, I am confident that my previous experiences and newly acquired skills will allow me to contribute even more effectively to the team. I have learned the importance of balancing personal responsibilities with professional commitments and have developed strategies to ensure that my work performance remains consistently high. My technical skills and practical experience have prepared me to handle diverse challenges and responsibilities. I am committed to upholding the values and standards of Seminole Gaming and am prepared to exceed expectations in my role.',
          '',
          { text: 'Additional Information:', bold: true, fontSize: 12 },
          'I have always valued the supportive and dynamic work environment at Seminole Gaming. The experiences and relationships I built during my tenure have left a lasting positive impact on me. I am motivated to return and contribute to the company’s continued success. I am confident that my renewed focus, dedication, and enhanced skill set make me a strong candidate for rehire.',
          '',
          { text: 'Thank you for considering my request. I am looking forward to the opportunity to discuss how I can once again be a valuable asset to Seminole Gaming. Please feel free to contact me at abejevilla55@gmail.com if you require any additional information or would like to schedule a meeting.', fontSize: 10 },
          '',
          { text: 'Sincerely, Abel J. Villareal', bold: true, fontSize: 12 },
        ];
      
        content.forEach((item) => {
          if (typeof item === 'string') {
            addText(item);
          } else {
            addText(item.text, item.bold, item.fontSize);
          }
        });
      
        doc.save('Rehire_Request_Letter.pdf');
      };

  return (
    <div>
      <button onClick={generatePDF} className="bg-indigo-500 text-white p-2 rounded">
        Download Rehire Request Letter
      </button>
    </div>
  );
};

export default GenerateLetter;

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import conf from "@/conf/conf";
import imageToBase64 from "image-to-base64/browser";
import QRCode from "qrcode";
import { Button } from "../ui/button";
import fonts from "@/constants/fontsAndImages.json";
import { format } from "date-fns";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const GetIdCardPage = ({ row }) => {
  const [loading, setLoading] = useState(false);
  const member = row.original.attributes;
  const generateIdCard = async () => {
    setLoading(true);
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [320, 205],
    });
    const qrurl = await imageToBase64(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${conf.domain}/memberDetails/${member.uid}`
    );
    const image = await imageToBase64(
      `${conf.strapiUrl}${member.photo.data.attributes.url}`
    );
    const footer = await imageToBase64("/idcardfooter.png");
    const cardBack = await imageToBase64("/cardBack.png");
    doc.addFileToVFS("nunitoBold", fonts.nunitoBold);
    doc.addFont("nunitoBold", "nunito", "bold");
    doc.addFileToVFS("nunitoRegular", fonts.nunitoRegular);
    doc.addFont("nunitoRegular", "nunito", "regular");
    doc.addImage(qrurl, 23, 100, 55, 55);
    doc.addImage(image, 23, 37, 55, 55);
    doc.addImage(footer, 0, 141, 325, 64);
    doc.setDrawColor("#0C007C");
    doc.roundedRect(50, 10, 226, 17, 4, 4);
    doc.setFontSize(12);
    doc.setFont("nunito", "bold");
    doc.text("Name:", 89, 47);
    if (member.isHusbandName) {
      doc.text("Husband's Name:", 89, 62);
    } else {
      doc.text("Father's Name:", 89, 62);
    }
    doc.text("Address:", 89, 77);
    doc.text("Designation:", 89, 121);
    doc.text("Serial Number:", 89, 137);
    doc.text("Date of Issue:", 89, 152);
    if (member.mobileNumber) {
      doc.text(member.mobileNumber, 30, 170);
    }
    doc.setFont("nunito", "regular");
    doc.text(member.fullName, 168, 47);
    doc.text(member.fatherHusbandName, 168, 62);
    doc.text(member.fullAddress, 168, 77, { maxWidth: 130 });
    doc.text(member.memberRole, 168, 121);
    doc.text(`SADA-${member.manualId}`, 168, 137);
    doc.text(format(member.doj, "PPP"), 168, 152);
    doc.setTextColor("#0C007C");
    doc.setFont("nunito", "bold");
    doc.text(`Shiromani Akali Dal Amritsar Member`, 74, 22);
    doc.addPage();
    doc.addImage(cardBack, 0, 0, 320, 205);
    doc.save(`${member.fullName}-SADA-${member.uid}.pdf`);
    setLoading(false);

    // add new page and add image named cardBack.jpg from public folder and make it as back side of id card
    // doc.save(`${member.fullName}-SADA-${member.uid}.pdf`);
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={generateIdCard}
        size="sm"
        variant="secondary"
        disabled={loading}
      >
        {loading && (
          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading ? "Download ID Card" : "Downloading..."}
      </Button>
    </div>
  );
};

export default GetIdCardPage;

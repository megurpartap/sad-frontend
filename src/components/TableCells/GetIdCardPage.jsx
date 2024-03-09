import React from "react";
import { jsPDF } from "jspdf";
import conf from "@/conf/conf";
import imageToBase64 from "image-to-base64/browser";
import QRCode from "qrcode";
import { Button } from "../ui/button";

const GetIdCardPage = ({ row }) => {
  const member = row.original.attributes;
  const generateIdCard = async () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [3.3, 2.1],
    });
    const qrurl = await imageToBase64(
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http:localhost/memberDetails/9"
    );
    const image = await imageToBase64(
      `${conf.strapiUrl}${member.photo.data.attributes.url}`
    );
    doc.addImage(qrurl, 0.3, 1.3, 0.6, 0.6);
    doc.addImage(image, 0.3, 0.3, 0.6, 0.9);
    doc.setFontSize(8);
    doc.text(member.fullName, 1.2, 0.5);
    doc.text(member.adhaarNumber, 1.2, 0.7);
    doc.text(member.mobileNumber, 1.2, 0.9);
    doc.text(member.fullAddress, 1.2, 1.1);
    doc.text(member.email, 1.2, 1.3);
    doc.save(`${member.fullName}-SADA-${Number(row.original.id) + 1000}.pdf`);
  };

  return (
    <div className="flex justify-center">
      <Button onClick={generateIdCard} size="sm" variant="secondary">
        Download ID Card
      </Button>
    </div>
  );
};

export default GetIdCardPage;

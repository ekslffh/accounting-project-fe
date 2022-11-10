import { Button, Container } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import ReceiptsBoard from "./ReceiptsBoard";
import "../Receipts.css"

function chunk(data, size) {
  const items = [...data];
  const arr = [];

  while (items.length) {
    arr.push(items.splice(0, size));
  }

  return arr;
}

function ReceiptsList(props) {
    const {printRef} = props;
    return (
      <div style={{ display: "none" }}>
           <Container ref={printRef}>
            <ReceiptsBoard />
            <div className="pagebreak"></div>
            {chunk(props.items, 4).map((imageList, listIndex) => {
              return (
                    <div className="receiptlayout" key={listIndex}>
                      <br/>
                      {imageList.map((image, idx) => {
                        return (
                            <img className="imageblock" width="315" height="490" src={image} alt="영수증" key={idx}/>
                        )})}
                      <div className="pagebreak" key={listIndex}></div>
                    </div>
                  )
              })}
          </Container>
      </div>
    )
}

export default function PrintReceipts(props) {
  const componentRef = React.useRef(null);
  return (
    <>
      <ReactToPrint 
        documentTitle="HSAP"
        trigger={() => <Button>프린트</Button>}
        content={() => componentRef.current}
      />
      <ReceiptsList printRef={componentRef} items={props.items} />
    </>
  );
};
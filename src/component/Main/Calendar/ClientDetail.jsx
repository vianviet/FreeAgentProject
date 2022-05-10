import React, { useState } from "react";
import {
  info,
  actinfo,
  angledownblack,
  angledownwhite,
} from "../../Header/svg/index";

export default function ClientDetail(props) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="client-detail">
      <div className="header-detail d-flex justify-content-between">
        <div className="header-detail-left d-flex ">
          <div className="client-name">{props.name}</div>
          <img
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 mt-1"
            src={showInfo ? actinfo : info}
            alt=""
          />
        </div>
        <div className="header-detail-right d-flex">
          <div id="select-left">
            オペレーター
            <img className="ml-1 mb-1" src={angledownblack} alt="" />
          </div>
          <div id="select-right" className={props.status.color}>
            {props.status.name}
            <img className="ml-1 mb-1" src={angledownwhite} alt="" />
          </div>
        </div>
      </div>
      <div className={showInfo ? "info" : "d-none"}>
        <div className="row-info d-flex">
          <div className="label-info">メール:</div>
          <div className="data">Ciprian@gmail.com</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">電話番号:</div>
          <div className="data">+82 9075347095</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">携帯電話番号:</div>
          <div className="data">+82 12355468</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">満期日:</div>
          <div className="data">MM-DD-YYYY</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">代理店コード:</div>
          <div className="data">CODE-1234</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">サブコード:</div>
          <div className="data">SUBCODE-1234</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">前契約証券番号:</div>
          <div className="data">CODE-OLD-VESION</div>
        </div>
      </div>
      <div className="end-detail d-flex flex-row-reverse mt-2">
        <button className="button-call px-3 rounded color-b-blue">
          {props.button}
        </button>
      </div>
    </div>
  );
}

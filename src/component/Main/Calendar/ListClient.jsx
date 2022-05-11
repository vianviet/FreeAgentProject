import React from "react";
import ClientDetail from "./ClientDetail";

export default function ListClient(props) {
  return (
    <div className="list-client">
      <div className="list-client-title">
        <div>List Client</div>
      </div>
      <div className="list-client-body">
        <div className="list-client-content">
          <div className="list-client-current-time">
            {props.time.getFullYear() +
              " 年 " +
              (props.time.getMonth() + 1) +
              " 月 "}
          </div>
          <div className="total-client">
            Total Client :<div className="client-count">99</div>
          </div>
          <div className="list-client-content-header-item">
            <div className="d-flex mr-5 ">
              未対応 <div className="tag-number color-b-success">99</div>
            </div>
            <div className="d-flex mr-4 ">
              連絡済 <div className="tag-number color-b-warning">99</div>
            </div>
            <div className="d-flex ">
              アポ確定 <div className="tag-number color-b-error">99</div>
            </div>
            <div className="d-flex mr-2 ">
              提案中（回答待ち)
              <div className="tag-number color-b-success">99</div>
            </div>
            <div className="d-flex mr-2 ">
              連絡不能 <div className="tag-number color-b-warning">99</div>
            </div>
            <div className="d-flex  ">
              対応済 <div className="tag-number color-b-error">99</div>
            </div>
          </div>
          <div className="list-client-content-detail">
            <ClientDetail
              name="真佐人"
              status="warning"
              button="ビデオ通話リンク作成"
            ></ClientDetail>
            <ClientDetail
              name="壮史朗"
              status="error"
              button="ビデオ通話"
            ></ClientDetail>
            <ClientDetail
              name="伸太郎"
              status="success"
              button="ビデオ通話"
            ></ClientDetail>
            <ClientDetail
              name="美桜"
              status="warning"
              button="ビデオ通話"
            ></ClientDetail>
            <ClientDetail
              name="美桜"
              status="warning"
              button="ビデオ通話"
            ></ClientDetail>
            <ClientDetail
              name="伸太郎"
              status="success"
              button="ビデオ通話"
            ></ClientDetail>
          </div>
        </div>
      </div>
    </div>
  );
}

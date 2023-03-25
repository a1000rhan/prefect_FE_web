import React from "react";

const NotFound = () => {
  return (
    <div className="bk">
      <div className="page-404">
        <div className="row">
          <div className="col-md-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="bk-img">
                <h1>404</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btns"
          onClick={() => {
            navigate("/");
          }}
        >
          home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

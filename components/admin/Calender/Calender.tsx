import React, { useState ,useEffect} from 'react';
export default function Calender() {
    return(
        <>
            <div className="table-part">
				<h2>Calender</h2>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23F09300&ctz=Asia%2FKolkata&mode=MONTH&showPrint=0&showCalendars=0&showTz=0&showTabs=1&showDate=1&showNav=1&showTitle=0&src=NDYxNzlhYTg2MzRkNTlkOTlmZDMwZjM1MWIzMTY1OTlhN2Q1ODYwMGNjZjI4YmU3MjY3NjA0NGNjN2M2ZjQwMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23C0CA33" style={{"border":"solid 1px #777"}} width="1150" height="600" frameBorder="0" scrolling="no"></iframe>
            </div>
        </>
    )
}
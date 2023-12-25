import React from 'react';
interface ReportColumnToolTipsProps {
  score: string;
  weight: string;
}

export const ReportToolTipTitle = (props: ReportColumnToolTipsProps) => {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      {props.score !='' &&<div>Score: {props.score}</div>}
      {props.weight !='' && <div>Weight: {props.weight}</div>}
      {props.weight == '' && props.score=='' && <div>Nothing to display</div>}
    </div>
  );
};
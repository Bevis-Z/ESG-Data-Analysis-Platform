
import React from 'react';
interface ReportCardHeaderProps {
  companyName: string;
  frameworkName:string;
  score: string;
}


export const ReportCardHeader=(props:ReportCardHeaderProps)=>{
    return (
        <div style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            padding: '10px 20px'
           
        }}>
            <div style={{
                fontSize: "1.5rem",
                fontWeight:'bold',
                color: '#333',
                flex: 1
            }}>
                {props.companyName}'s report
            </div>
            <div style={{
                fontSize: "1.3rem",
                marginLeft:'50px',
                color: '#666',
                flex: 2
            }}>
                Framework: {props.frameworkName}
            </div>
            {props.score && 
            <div style={{
                color: '#007BFF',
                flex: 1
            }}>
                Score: {props.score}
            </div>}
        </div>
        )
}
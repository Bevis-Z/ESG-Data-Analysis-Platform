import React from 'react';

interface separatorTitle{
    title:string
}

export const ModalSeparatorLine=({title}:separatorTitle)=>{
    return (
        <div style={{ width: '100%', position: 'relative', textAlign: 'center' }}>
            <div style={{ width: "90%", height: "2px", border: '1px solid black', margin: "15px auto" }}></div>
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '0 5px', zIndex: 1 }}>{title}</span>
        </div>
    );
}
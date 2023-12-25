import React, { useEffect, useState } from 'react';
import { Input, Button, Form } from 'antd';
import { CreateDecompositionTreeGraph } from '@/components';
import './index.less';
import {left} from "@antv/g2plot/lib/plots/sankey/sankey";


const IndicatorForm = ({subIndex , onChange, index, resetKey, data = {} }) => {
  const [indicators, setIndicators] = useState([{}]);

  useEffect(() => {
    if (resetKey !== 0) {
      setIndicators([{}]);
    }
  }, [resetKey]);
  // @ts-ignore
  return (
  <div style={{
    paddingLeft: 10,
    display: "flex",
    flexDirection: "column"
  }}>
    <Form.Item
      label={`Indicator ${index + 1} Name`}
      style={{
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Input
        placeholder="Name"
        value={data.indicatorName || ''}
        onChange={e => onChange({ value: e.target.value, type: 'indicatorName', index })}
      />
      <Input
        placeholder="Weight( 0-100 only)"
        value={data.eleWeight || ''}
        onChange={e => onChange({ value: e.target.value, type: 'eleWeight', index })}
        style={{ marginTop:10 }}
      />
    </Form.Item>
  </div>
   );
};

const TertiaryElementForm = ({ onChange, index, resetKey, data }) => {
  const [indicators, setIndicators] = useState(data.indicatorDTOList || [{}]);
  const [tertiaryElements, setTertiaryElements] = useState([{}]);

  useEffect(() => {
    if (resetKey !== 0) {
      setTertiaryElements([{}]);
    }
  }, [resetKey]);
  // @ts-ignore
  const handleInputChange = (e) => {
    const { value, type, index: subIndex } = e;
    const updatedIndicators = [...indicators];
    if (type === 'deleteIndicator') {
      updatedIndicators.splice(subIndex, 1);
      setIndicators(updatedIndicators);
      onChange({ ...e, value: updatedIndicators, type: 'indicatorDTOList', index });
    } else if (type === 'indicatorName' || type === 'eleWeight') {
      updatedIndicators[subIndex] = { ...updatedIndicators[subIndex], [type]: value };
      setIndicators(updatedIndicators);
      onChange({ ...e, value: updatedIndicators, type: 'indicatorDTOList', index });
    }
    updatedIndicators[subIndex] = { ...updatedIndicators[subIndex], [type]: value };
    setIndicators(updatedIndicators);
    onChange({ ...e, value: updatedIndicators, type: 'indicatorDTOList', index });
  };

  return (
    <div style={{ paddingLeft: 15, width:400,  flexShrink: 0, flexGrow: 0 }}>
      <Form.Item label={`Metrics ${index + 1} Name`}>
        <Input
          placeholder="Name"
          value={data.tertiaryElementName}
          onChange={e => onChange({ value: e.target.value, type: 'tertiaryElementName', index })}
        />
        <Input
          placeholder="Weight( 0-100 only)"
          value={data.eleWeight}
          onChange={e => onChange({ value: e.target.value, type: 'eleWeight', index })}
          style={{ marginTop:10 }}
        />

      </Form.Item>
      {indicators.map((indicatorData, idx) => (
        <IndicatorForm key={idx} data={indicatorData} subIndex={index}  index={idx} onChange={handleInputChange} resetKey={resetKey} />

      ))}
      <Button onClick={() => setIndicators([...indicators, {}])} style={{ marginLeft: 20, color: "#1577FF" }}>Add Indicator</Button>

    </div>
  );
};

const SubElementForm = ({ onChange, index, resetKey, data }) => {
  const [tertiaryElements, setTertiaryElements] = useState(data.tertiaryElementDTOList || [{}]);
  const [subElements, setSubElements] = useState([{}]);


  useEffect(() => {
    if (resetKey !== 0) {
      setSubElements([{}]);
    }
  }, [resetKey]);


  const handleInputChange = (e) => {
    const { value, type, index: subIndex } = e;
    const updatedElements = [...tertiaryElements];
    updatedElements[subIndex] = { ...updatedElements[subIndex], [type]: value };
    setTertiaryElements(updatedElements);
    onChange({ ...e, value: updatedElements, type: 'tertiaryElementDTOList', index });
  };

  return (
    <div style={{
      paddingLeft: 5,
      display: "flex",
      flexDirection: "row",
      overflow: "auto",
      width: 1000,


    }}>
      <Form.Item
        label={`Area ${index + 1} Name`}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          flexShrink: 0,
          flexGrow: 0
        }}
      >
        <Input
          placeholder="Name"
          value={data.subElementName}
          onChange={e => onChange({ value: e.target.value, type: 'subElementName', index })}
        />
        <Input
          placeholder="Weight( 0-100 only)"
          value={data.eleWeight}
          onChange={e => onChange({ value: e.target.value, type: 'eleWeight', index })}
          style={{
            marginTop:10
          }}
        />
        <Button onClick={() => {
          onChange({ type: 'deleteSubElement', index });
        }} style={{ marginTop:10, color: "red" }}>Delete Topic Area</Button>
      </Form.Item>
      {tertiaryElements.map((tertiaryData, idx) => (
        <TertiaryElementForm key={idx} data={tertiaryData} index={idx} onChange={handleInputChange} resetKey={resetKey}/>
      ))}
      <Button onClick={() => setTertiaryElements([...tertiaryElements, {}])} style={{ marginLeft: 20, color: "#1577FF" }}>Add Metrics</Button>
    </div>
  );
};

const FrameworkModalContent = ({ data: initialData, onDataChange }) => {
  const [frameworkData, setFrameworkData] = useState(initialData);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    onDataChange(frameworkData);
  }, [frameworkData, onDataChange]);


  const handleInputChange = (details) => {
    const { value, type, index ,subIndex, subSubIndex } = details;
    let updatedData = JSON.parse(JSON.stringify(frameworkData));

    switch (type) {
      case 'deleteSubElement':
        updatedData.subElementDTOList.splice(index, 1);
        break;
      case 'deleteTertiaryElement':
        updatedData.subElementDTOList[index].tertiaryElementDTOList.splice(subIndex, 1);
        break;
      case 'deleteIndicator':
        updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList.splice(subSubIndex, 1);
        break;
      case 'frameworkName':
        updatedData.frameworkName = value;
        break;
      case 'subElementName':
        updatedData.subElementDTOList[index].subElementName = value;
        break;
      case 'eleWeight':
        updatedData.subElementDTOList[index].eleWeight = value;
        break;
      case 'tertiaryElementName':
        if (!updatedData.subElementDTOList[index].tertiaryElementDTOList) {
          updatedData.subElementDTOList[index].tertiaryElementDTOList = [];
        }
        updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].tertiaryElementName = value;
        break;
      case 'tertiaryElementWeight':
        if (!updatedData.subElementDTOList[index].tertiaryElementDTOList) {
          updatedData.subElementDTOList[index].tertiaryElementDTOList = [];
        }
        updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].eleWeight = value;
        break;
      case 'indicatorName':
        if (!updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList) {
          updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList = [];
        }
        updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList[subSubIndex].indicatorName = value;
        break;
      case 'indicatorWeight':
        if (!updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList) {
          updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList = [];
        }
        updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList[subSubIndex].eleWeight = value;
        break;
      case 'tertiaryElementDTOList':
        updatedData.subElementDTOList[index].tertiaryElementDTOList = value;
        break;
      case 'indicatorDTOList':
        updatedData.subElementDTOList[index].tertiaryElementDTOList[subIndex].indicatorDTOList = value;
        break;
      default:
        console.warn(`Unhandled type: ${type}`);
    }

    setFrameworkData(updatedData);
  };

  return (
    <div>
      <CreateDecompositionTreeGraph data={frameworkData} />
      <Form>
          <div className={'modalInput'}>
            <Form.Item label="Framework Name">
              <Input placeholder="Name" value={frameworkData.frameworkName} onChange={e => handleInputChange({ value: e.target.value, type: 'frameworkName' })} />
            </Form.Item>
            {frameworkData.subElementDTOList.map((subElement, idx) => (
              <div style={{width:'1130px'}} className={'mainInputArea'} key={idx}>
                <SubElementForm index={idx} data={subElement} onChange={handleInputChange} resetKey={resetKey} />
              </div>
            ))}
            <Button style={{color: "#1577FF", marginTop: "1em"}} onClick={() => setFrameworkData(prev => ({ ...prev, subElementDTOList: [...prev.subElementDTOList, {}] }))}>Add Topic Area</Button>
          </div>
      </Form>
    </div>
  );
};

export default FrameworkModalContent;

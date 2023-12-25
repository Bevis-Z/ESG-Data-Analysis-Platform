import { Card, Table, Tooltip,Input ,Button,Modal,Switch} from 'antd';
import { ReportToolTipTitle } from '@/components';
import { applyFrameworkReportUsingPOST, insertFrameworkReportUsingPOST} from '@/services/ant-design-pro/frameworkController';
import React, { useState, useEffect,useRef } from 'react';
import { Alert, message } from 'antd';
import { Sunburst } from '@ant-design/plots';
import G6 from '@antv/g6';
import { DecompositionTreeGraph } from '@ant-design/graphs';
import cloneDeep from 'lodash/cloneDeep';
const getColorBasedOnScore = (score:any) => {
  if (score <= 25) return '#FF5555';
  if (score <= 50) return '#ff8e00';
  if (score <= 75) return '#00ffd8';
  return '#28ef6d';
};

const ReportMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const { Search } = Input;
const ChartInlineContainer=({framework}:any)=>{
  const [data, setData] = useState({
    name:framework.frameworkName,
    value:framework.score,
    label:'123',
    children: framework.subElementDTOList.map((subElement:any) => ({
      name:subElement.subElementName,
      value:subElement.score,
      children: subElement.tertiaryElementDTOList.map((tertiaryElement:any) => ({
        name:tertiaryElement.tertiaryElementName,
        value:tertiaryElement.score,
        children: tertiaryElement.indicatorDTOList.map((indicator:any)=>({
          name:indicator.indicatorName,
          value:indicator.score,
          label:indicator.indicatorName,

        })),

      })),
    })),
  });
  useEffect(() => {

  }, [data]);

  const config = {
    data,
    innerRadius: 0.3,
    interactions: [
      {
        type: 'element-active',
      },
    ],


  };
  return (
  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignContent:'center'}}>
    <Sunburst {...config} />
  </div>)
}


const ReportTable = ({report}:any) => {
  const subElements = report.frameworkDTO?.subElementDTOList || [];

  const columns = [
    {
      title: <Tooltip title={<ReportToolTipTitle score={report.frameworkDTO.score} weight='' />}> {report.frameworkDTO?.frameworkName} - {report.companyName}</Tooltip>,
      children: subElements.map((subElement:any) => ({
        title: <Tooltip title={<ReportToolTipTitle score={subElement.score} weight={subElement.eleWeight} />}> {subElement.subElementName}</Tooltip>,
        key: subElement.subElementId,

        children: subElement.tertiaryElementDTOList.map((tertiaryElement:any) => ({
          title: <Tooltip title={<ReportToolTipTitle score={tertiaryElement.score} weight={tertiaryElement.eleWeight} />}> {tertiaryElement.tertiaryElementName}</Tooltip>,
          key: tertiaryElement.tertiaryElementId,
          children: tertiaryElement.indicatorDTOList.map((indicator:any)=>({
            title: <Tooltip title={<ReportToolTipTitle score={indicator.score} weight={indicator.eleWeight} />}> {indicator.indicatorName}</Tooltip>,
            key: indicator.indicatorId,
            render: () => (

              <div
                style={{
                  backgroundColor: getColorBasedOnScore(indicator.score),
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {indicator.score}
              </div>

            )
          })),

        })),
      })),
    },
  ];

  return (
    <Card style={{ margin: '15px 0' }}>
      <Table
        dataSource={[{}]}
        columns={columns}
        pagination={false}
        bordered={true}
        showHeader={true}
      />
      <ChartInlineContainer framework={report.frameworkDTO}></ChartInlineContainer>
    </Card>
  );
};




export const ReportTemplate = ({framework,companyNameIpt,userId,hideDisplayEdit}:any)=>{
  type inputDict = Record<number, number>;

  const [companyName,setCompanyName]=useState('');
  const [data,setData]=useState(framework);
  const [inputValues, setInputValues] = useState<inputDict>({});
  const [currentSelectedElement,setCurrentSelectedElement]=useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode,setMode]=useState(-1);mode
  const [counter,setCounter]=useState(0);
  const increamentCounter=()=>{
    setCounter(counter+1);
  }
  const findIndicator=(data,id)=>{
    for(let i of data.subElementDTOList){
      for(let j of i.tertiaryElementDTOList){
        for(let z of j.indicatorDTOList){
          if(z.indicatorId==id) return z;
        }
      }
    }
    return null;
  }
  const handleInputChange = (target, event: React.ChangeEvent<HTMLInputElement>) => {
    if(parseFloat(event.target.value)>100){
      message.error('Input value should be in range 0 - 100');
      return;
    }
    let temp=cloneDeep(data);
    let tar=findIndicator(temp,target.indicatorId);
    tar.iptValue=parseFloat(event.target.value);
    setData(temp);
  };

  const showModal = (element:any,mode:number) => {
    setIsModalVisible(true);
    setMode(mode);
    setCurrentSelectedElement(element);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentSelectedElement({});
  };
  let column=[
    {
      title:<div onClick={()=>{showModal(framework,1)}}>{data.frameworkName}</div>,
      children: data.subElementDTOList.map((subElement:any) => ({
        title: <Tooltip title={<ReportToolTipTitle score={subElement.score} weight={subElement.eleWeight} />}> <div onClick={()=>{showModal(subElement,2)}}>{subElement.subElementName}</div></Tooltip>,
        key: subElement.subElementId,
        weight:subElement.eleWeight,
        children: subElement.tertiaryElementDTOList.map((tertiaryElement:any) => ({
          title: <Tooltip title={<ReportToolTipTitle score={tertiaryElement.score} weight={tertiaryElement.eleWeight} />}> <div onClick={()=>{showModal(tertiaryElement,3)}}>{tertiaryElement.tertiaryElementName}</div></Tooltip>,
          key: tertiaryElement.tertiaryElementId,
          weight:tertiaryElement.eleWeight,

          children: tertiaryElement.indicatorDTOList.map((indicator:any)=>({
            title: <Tooltip title={<ReportToolTipTitle score={indicator.score} weight={indicator.eleWeight} />}> <div onClick={()=>{showModal(indicator,4)}}>{indicator.indicatorName}</div></Tooltip>,
            key: indicator.indicatorId,
            weight:indicator.eleWeight,
            render: () => (

              <div
                style={{

                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <Input onChange={(e)=>{handleInputChange(indicator,e)}} onBlur={(e) => {if(parseFloat(e.target.value)>100){e.target.value='0'}}}/>
                </div>
              </div>

            )
          })),

        })),
      })),
    },
  ]
  let graphData={
    name:data.frameworkName,
    value: {
      title: data.frameworkName,
      items: [
        {
          text: data.score,
        }

      ],
    },

    children: data.subElementDTOList.map((subElement:any) => ({
      name:subElement.subElementName,
      value: {
        title: subElement.subElementName,
        id:subElement.subElementId,
        items: [

          {
            text: 'Weight',
            value: subElement.eleWeight,
          },
        ],
      },
      children: subElement.tertiaryElementDTOList.map((tertiaryElement:any) => ({
        name:tertiaryElement.tertiaryElementName,

        value: {
          title: tertiaryElement.tertiaryElementName,
          id:tertiaryElement.tertiaryElementId,
          items: [

            {
              text: 'Weight',
              value: tertiaryElement.eleWeight,
            }

          ],
        },
        children: tertiaryElement.indicatorDTOList.map((indicator:any)=>({
          name:indicator.indicatorName,

          value: {
            title: indicator.indicatorName,
            id:indicator.indicatorId,
            items: [

              {
                text: 'Weight',
                value: indicator.eleWeight,
              },
              {
                text: 'Input',
                value: indicator.iptValue?indicator.iptValue: 'No value',
              },
            ],
          },
          label:indicator.indicatorName,

        })),

      })),
    })),

  };
  useEffect(() => {
    graphData={
      name:data.frameworkName,
      value: {
        title: data.frameworkName,
        items: [
          {
            text: data.score,
          }

        ],
      },

      children: data.subElementDTOList.map((subElement:any) => ({
        name:subElement.subElementName,
        value: {
          title: subElement.subElementName,
          id:subElement.subElementId,
          items: [

            {
              text: 'Weight',
              value: subElement.eleWeight,
            },
          ],
        },
        children: subElement.tertiaryElementDTOList.map((tertiaryElement:any) => ({
          name:tertiaryElement.tertiaryElementName,

          value: {
            title: tertiaryElement.tertiaryElementName,
            id:tertiaryElement.tertiaryElementId,
            items: [

              {
                text: 'Weight',
                value: tertiaryElement.eleWeight,
              }

            ],
          },
          children: tertiaryElement.indicatorDTOList.map((indicator:any)=>({
            name:indicator.indicatorName,

            value: {
              title: indicator.indicatorName,
              id:indicator.indicatorId,
              items: [

                {
                  text: 'Weight',
                  value: indicator.eleWeight,
                },
                {
                  text: 'Input',
                  value: indicator.iptValue?indicator.iptValue: 'No value',
                },
              ],
            },
            label:indicator.indicatorName,

          })),

        })),
      })),

    };
    column=[
      {
        title:<div onClick={()=>{showModal(framework,1)}}>{data.frameworkName}</div>,
        children: data.subElementDTOList.map((subElement:any) => ({
          title: <Tooltip title={<ReportToolTipTitle score={subElement.score} weight={subElement.eleWeight} />}> <div onClick={()=>{showModal(subElement,2)}}>{subElement.subElementName}</div></Tooltip>,
          key: subElement.subElementId,
          weight:subElement.eleWeight,
          children: subElement.tertiaryElementDTOList.map((tertiaryElement:any) => ({
            title: <Tooltip title={<ReportToolTipTitle score={tertiaryElement.score} weight={tertiaryElement.eleWeight} />}> <div onClick={()=>{showModal(tertiaryElement,3)}}>{tertiaryElement.tertiaryElementName}</div></Tooltip>,
            key: tertiaryElement.tertiaryElementId,
            weight:tertiaryElement.eleWeight,

            children: tertiaryElement.indicatorDTOList.map((indicator:any)=>({
              title: <Tooltip title={<ReportToolTipTitle score={indicator.score} weight={indicator.eleWeight} />}> <div onClick={()=>{showModal(subElement,4)}}>{indicator.indicatorName}</div></Tooltip>,
              key: indicator.indicatorId,
              weight:indicator.eleWeight,
              render: () => (

                <div
                  style={{

                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div>
                    <Input onChange={(e)=>{handleInputChange(indicator,e)}}/>
                  </div>
                </div>

              )
            })),

          })),
        })),
      },
    ]
  },[data,currentSelectedElement,companyName]);




  const config = {
    data:graphData,
    behaviors: ['drag-canvas', 'drag-node'],
    nodeCfg: {
      items: {
        type: 'html-node',
        style: (cfg, group, type) => {
          const styles = {
            value: {
              fill: '#52c41a',
            },
            text: {
              fill: '#aaa',
            },
            icon: {
              width: 10,
              height: 10,
            },
          };
          return styles[type];
        },
      },
      nodeStateStyles: {
        hover: {
          stroke: '#1890ff',
          lineWidth: 2,
        },
      },
      style: {
        stroke: '#40a9ff',
      },
    },
    edgeCfg: {
      endArrow: {
        fill: '#40a9ff',
      },
      style: (item, graph) => {
        return {
          stroke: '#40a9ff',
          lineWidth: 1,
          strokeOpacity: 0.5,
        };
      },
    },
    markerCfg: (cfg) => {
      const { children } = cfg;
      return {
        show: children?.length,
      };
    },
  };

  const checkFrameworkValid=(target:API.FrameworkDTO)=>{
    if(!target.frameworkName || target.frameworkName.trim()=='' || !target.subElementDTOList || target.subElementDTOList.length==0 || !companyName || companyName.trimEnd()=='') return false;
    for(let i of target.subElementDTOList){
      if(!i.eleWeight || i.eleWeight<0 || !i.subElementName || i.subElementName.trim()=='' || !i.tertiaryElementDTOList || i.tertiaryElementDTOList.length==0) return false;
      for(let j of i.tertiaryElementDTOList){
        if(!j.eleWeight || j.eleWeight<0 || !j.tertiaryElementName || j.tertiaryElementName.trim()=='' || !j.indicatorDTOList || j.indicatorDTOList.length==0) return false;
        for(let z of j.indicatorDTOList){
          if(!z.eleWeight || z.eleWeight<0 || !z.indicatorName || z.indicatorName.trim()=='' || !z.iptValue || z.iptValue<0) return false;
        }
      }
    }
    return true;
  }
  const editCompanyName=(e)=>{
    setCompanyName(e.target.value.trim())
  }
  return (
    <div>
      <div style={{alignSelf:'flex-start'}}>Company Name:</div>
      <Input placeholder="Company name" onChange={editCompanyName} style={{ width: 200 }} />

      {counter==0 && <Button type="primary" disabled={!checkFrameworkValid(data)}  onClick={async ()=>{

        try {

          const frameworkDTO = data as API.FrameworkDTO;
          console.log(frameworkDTO);
          const res = await applyFrameworkReportUsingPOST({companyName:companyName},frameworkDTO);}
        catch (error) {
          const defaultLoginFailureMessage = 'Apply framework failed!';
          message.error(defaultLoginFailureMessage);
          hideDisplayEdit();
        }
        hideDisplayEdit();

      }}>Apply framework & gen report</Button>}
      {counter!=0 && <Button type="primary" disabled={!checkFrameworkValid(data)} onClick={async ()=>{

        try {

          const frameworkDTO = data as API.FrameworkDTO;
          console.log(frameworkDTO);
          const res = await insertFrameworkReportUsingPOST({companyName:companyName},frameworkDTO);
          hideDisplayEdit();
        }
        catch (error) {
          let defaultLoginFailureMessage = 'Apply framework failed, please try again!';
          if(error.response.data.message.includes('Duplicate entry')){
            defaultLoginFailureMessage='Framework name already exists.';
            message.error(defaultLoginFailureMessage);
          }
          else {
            message.error(defaultLoginFailureMessage);
            hideDisplayEdit();
          }
        }


      }}>Save framework & gen report</Button>}
      <div style={{fontStyle:'italic', fontSize:'0.9rem', color:'red'}}>*Input value and weight should be in range 0 -100</div>
      {counter!=0 && <div style={{fontStyle:'italic', fontSize:'0.9rem', color:'red'}}>*Please change the framework name</div>}
      <Table
        dataSource={[{}]}
        columns={column}
        pagination={false}
        bordered={true}
        showHeader={true}
      />
      <div style={{position:'relative'}}>
        <Modal destroyOnClose title="Edit element" visible={isModalVisible} onCancel={handleCancel}>
          {mode==1 &&<AddSubElement target={currentSelectedElement} data={data} setData={setData} handleCancel={handleCancel} increamentCounter={increamentCounter}/>}
          {mode==2 &&<AddTerElement target={currentSelectedElement} data={data} setData={setData} handleCancel={handleCancel} increamentCounter={increamentCounter}/>}
          {mode==3 &&<AddIndicator target={currentSelectedElement} data={data} setData={setData} handleCancel={handleCancel} increamentCounter={increamentCounter}/>}
          {mode==4 &&<EditIndicator target={currentSelectedElement} data={data} setData={setData} handleCancel={handleCancel} increamentCounter={increamentCounter}/>}
        </Modal>
      </div>
    <div style={{height:'800px'}}>
      <DecompositionTreeGraph {...config} />
    </div>
    </div>
  );
}
const AddSubElement=({target,data,setData,handleCancel,increamentCounter}:any)=>{
  console.log(target);
  const [elementName, setElementName] = useState('');
  const [weight, setWeight] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 新增
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(true);
  const [editName,setEditName]=useState('');
 const [addNode,setAddNode]=useState(false);
  useEffect(() => {
    if (elementName.trim()!='' &&!isNaN(weight) && weight >=0 ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
    if(editName.trim()!=''){
      setIsEditButtonDisabled(false);
    }else setIsEditButtonDisabled(true);
  }, [elementName, weight,editName,addNode]);
  const onChangeName=(e)=>{
    setElementName(e.target.value.trim());
  }
  const onChangeWeight=(e)=>{
    setWeight(parseFloat(e.target.value));

  }

  const onEditName=(e)=>{
    setEditName(e.target.value.trim());
  }

  const onChangeAdd=()=>{
    setAddNode(true);
  }
  const onCloseAdd=()=>{
    setAddNode(false);
  }
  return (
      <div>
        <div style={{display:'flex', flexDirection:'row',fontSize:'1rem', fontWeight:'bold',alignItems:'center',marginBottom:'20px'}}>
          <div style={{marginRight:'5px',backgroundColor: !addNode? 'white' : 'rgb(181, 181, 181)', lineHeight:'30px', width:'150px',textAlign:'center', borderTop: !addNode?'1px solid black':'none', borderLeft: !addNode?'1px solid black':'none', borderRight: !addNode?'1px solid black':'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:addNode?'10px':'0',borderBottomRightRadius:addNode?'10px':'0'}} onClick={onCloseAdd}>Edit current node</div>
          <div style={{backgroundColor: addNode? 'white' : 'rgb(181, 181, 181)', lineHeight:'30px', width:'100px',textAlign:'center', borderTop: addNode?'1px solid black':'none', borderLeft: addNode?'1px solid black':'none', borderRight: addNode?'1px solid black':'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:!addNode?'10px':'0',borderBottomRightRadius:!addNode?'10px':'0'}} onClick={onChangeAdd}>Add child</div>

        </div>
        { !addNode &&
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

            <div style={{alignSelf:'flex-start'}}>Edit framework name</div>
            <Input placeholder="Framework name" onChange={onEditName} style={{ width: 200 }} />
            <div>
              <Button type="primary" disabled={isEditButtonDisabled} onClick={()=>{
                let reg=cloneDeep(data);
                reg.frameworkName=editName;
                increamentCounter();
                setData(reg);

                handleCancel();
              }}>Edit</Button>
            </div>
          </div>
        }
        { addNode &&
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{alignSelf:'flex-start'}}>Sub element name</div>
            <Input placeholder="Sub element name" onChange={onChangeName} style={{ width: 200 }} />
            <div style={{alignSelf:'flex-start'}}>Weight</div>
            <Input placeholder="Enter weight" onChange={onChangeWeight} style={{ width: 200 }} />
            <div>
              <Button type="primary" disabled={isButtonDisabled} onClick={()=>{
                if(weight>100){
                  message.error('Weight should be in range of 0 - 100');
                  return;
                }
                let reg=cloneDeep(data);
                const maxId = Math.max(...reg.subElementDTOList.map(item => item.subElementId));
                const newId = maxId + 1;
                reg.subElementDTOList.push({
                  subElementId:newId,
                  subElementName:elementName,
                  tertiaryElementDTOList:[],
                  eleWeight:weight
                })
                increamentCounter();
                setData(reg);

                handleCancel();
              }}>Add</Button>
            </div>
          </div>
        }

      </div>

     );

}

const AddTerElement=({target,data,setData,handleCancel,increamentCounter}:any)=>{
  const [elementName, setElementName] = useState('');
  const [weight, setWeight] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 新增

  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(true);
  const [editName,setEditName]=useState('');
 const [addNode,setAddNode]=useState(false);
  const [editWeight,setEditWeight]=useState(0);
  const getTerId=()=>{
    if(!data) return;
    let max=-1;
    for(let i of data.subElementDTOList){
      for(let j of i.tertiaryElementDTOList){
        if(j.tertiaryElementId>max) max=j.tertiaryElementId;
      }
    }
    return max+1;
  }
  useEffect(() => {


    if (elementName.trim()!='' &&!isNaN(weight) && weight >=0) {
      setIsButtonDisabled(false);
    }
    else {
      setIsButtonDisabled(true);
    }
    if(editName.trim()!='' && !isNaN(editWeight) && editWeight >0) setIsEditButtonDisabled(false);
    else setIsEditButtonDisabled(true);
  }, [elementName, weight,editName,addNode,editWeight]);

  const onChangeName=(e)=>{
    setElementName(e.target.value.trim());
  }
  const onChangeWeight=(e)=>{
    setWeight(parseFloat(e.target.value));
  }
  const onEditName=(e)=>{
    setEditName(e.target.value.trim());
  }
  const onEditWeight=(e)=>{
    setEditWeight(parseFloat(e.target.value));
  }


  const onChangeAdd=()=>{
    setAddNode(true);
  }
  const onCloseAdd=()=>{
    setAddNode(false);
  }
  return (
      <div>
        <div style={{display:'flex', flexDirection:'row',fontSize:'1rem', fontWeight:'bold',alignItems:'center',marginBottom:'20px'}}>
          <div style={{marginRight:'5px',backgroundColor: !addNode? 'white' : 'rgb(181, 181, 181)', lineHeight:'30px', width:'150px',textAlign:'center', borderTop: !addNode?'1px solid black':'none', borderLeft: !addNode?'1px solid black':'none', borderRight: !addNode?'1px solid black':'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:addNode?'10px':'0',borderBottomRightRadius:addNode?'10px':'0'}} onClick={onCloseAdd}>Edit current node</div>
          <div style={{backgroundColor: addNode? 'white' : 'rgb(181, 181, 181)', lineHeight:'30px', width:'100px',textAlign:'center', borderTop: addNode?'1px solid black':'none', borderLeft: addNode?'1px solid black':'none', borderRight: addNode?'1px solid black':'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:!addNode?'10px':'0',borderBottomRightRadius:!addNode?'10px':'0'}} onClick={onChangeAdd}>Add child</div>

        </div>
        { !addNode &&
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

            <div style={{alignSelf:'flex-start'}}>Edit selected sub element name</div>
            <Input placeholder="Sub element name" onChange={onEditName} style={{ width: 200 }} />

            <div style={{alignSelf:'flex-start'}}>Edit selected sub element weight</div>
            <Input placeholder="Sub element weight" onChange={onEditWeight} style={{ width: 200 }} />
            <div style={{position:'absolute',right:'10px',bottom:'10px'}}>
                <Button type="primary" onClick={()=>{
                    let reg=cloneDeep(data);

                    const preLen = reg.subElementDTOList.length;
                    reg.subElementDTOList = reg.subElementDTOList.filter(z => z.subElementId !== target.subElementId);

                    if(preLen==reg.subElementDTOList.length){
                      console.log('Error, object not found');
                      return;
                    }

                    increamentCounter();
                    setData(reg);
                    handleCancel();
                  }}>Remove node</Button>
              </div>
            <div>
              <Button type="primary" disabled={isEditButtonDisabled} onClick={()=>{
                if(editWeight>100){
                  message.error('Weight should be in range of 0 - 100');
                  return;
                }
                let reg=cloneDeep(data);
                let temp=reg.subElementDTOList.find(obj=>obj.subElementId==target.subElementId);
                if(!temp){
                  console.log('Error, object not found');
                  return;
                }
                temp.eleWeight=editWeight;
                temp.subElementName=editName;
                increamentCounter();
                setData(reg);
                handleCancel();
              }}>Edit</Button>
            </div>
          </div>
        }
        { addNode &&
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div>Metrics name</div>
              <Input placeholder="Sub element name" onChange={onChangeName} style={{ width: 200 }} />
              <div>Weight</div>
              <Input placeholder="Enter weight" onChange={onChangeWeight} style={{ width: 200 }} />
              <Button type="primary" disabled={isButtonDisabled} onClick={()=>{
                if(weight>100){
                  message.error('Weight should be in range of 0 - 100');
                  return;
                }
                let reg=cloneDeep(data);
                let temp=reg.subElementDTOList.find(obj=>obj.subElementId==target.subElementId);
                if(!temp){
                  console.log('not found');
                  return;
                }
                temp.tertiaryElementDTOList.push({
                  tertiaryElementId:getTerId(),
                  subElementId:target.subElementId,
                  tertiaryElementName:elementName,
                  indicatorDTOList:[],
                  eleWeight:weight
                })
                increamentCounter();
                setData(reg);
                handleCancel();
              }}>Add</Button>
          </div>
        }

      </div>


     );

}
const AddIndicator=({target,data,setData,handleCancel,increamentCounter}:any)=>{
  const [elementName, setElementName] = useState('');
  const [weight, setWeight] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 新增

  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(true);
  const [editName,setEditName]=useState('');
 const [addNode,setAddNode]=useState(false);
  const [editWeight,setEditWeight]=useState(0);
  const getTerId=()=>{
    if(!data) return;
    let max=-1;
    for(let i of data.subElementDTOList){
      for(let j of i.tertiaryElementDTOList){
        for(let z of j.indicatorDTOList){
          if(z.indicatorId>max) max=z.indicatorId;
        }
      }
    }
    return max+1;
  }
  useEffect(() => {
    if (elementName.trim()!='' &&!isNaN(weight) && weight >=0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
    if(editName.trim()!='' && !isNaN(editWeight) && editWeight >0) setIsEditButtonDisabled(false);
    else setIsEditButtonDisabled(true);
  }, [elementName, weight,editName,addNode,editWeight]);

  const onChangeName=(e)=>{
    setElementName(e.target.value.trim());
  }
  const onChangeWeight=(e)=>{
    setWeight(parseFloat(e.target.value));
  }
  const onEditName=(e)=>{
    setEditName(e.target.value.trim());
  }
  const onEditWeight=(e)=>{
    setEditWeight(parseFloat(e.target.value));
  }
  const onChangeAdd=()=>{
    setAddNode(true);
  }
  const onCloseAdd=()=>{
    setAddNode(false);
  }
  return (
      <div>
        <div style={{display:'flex', flexDirection:'row',fontSize:'1rem', fontWeight:'bold',alignItems:'center',marginBottom:'20px'}}>
          <div style={{marginRight:'5px',backgroundColor: !addNode? 'white' : 'rgb(181, 181, 181)', lineHeight:'30px', width:'150px',textAlign:'center', borderTop: !addNode?'1px solid black':'none', borderLeft: !addNode?'1px solid black':'none', borderRight: !addNode?'1px solid black':'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:addNode?'10px':'0',borderBottomRightRadius:addNode?'10px':'0'}} onClick={onCloseAdd}>Edit current node</div>
          <div style={{backgroundColor: addNode? 'white' : 'rgb(181, 181, 181)', lineHeight:'30px', width:'100px',textAlign:'center', borderTop: addNode?'1px solid black':'none', borderLeft: addNode?'1px solid black':'none', borderRight: addNode?'1px solid black':'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:!addNode?'10px':'0',borderBottomRightRadius:!addNode?'10px':'0'}} onClick={onChangeAdd}>Add child</div>

        </div>
        { !addNode &&
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

            <div style={{alignSelf:'flex-start'}}>Edit selected Metrics name</div>
            <Input placeholder="Metrics name" onChange={onEditName} style={{ width: 200 }} />
            <div style={{alignSelf:'flex-start'}}>Edit selected Metrics weight</div>
            <Input placeholder="Metrics weight" onChange={onEditWeight} style={{ width: 200 }} />
            <div>
              <Button type="primary" disabled={isEditButtonDisabled} onClick={()=>{
                if(editWeight>100){
                  message.error('Weight should be in range of 0 - 100');
                  return;
                }
                let reg=cloneDeep(data);
                let temp=null;
                for(let i of reg.subElementDTOList){
                  if(temp) break;
                  for(let j of i.tertiaryElementDTOList){
                    if(j.tertiaryElementId==target.tertiaryElementId){
                      temp=j;
                      break;
                    }
                  }
                }
                if(!temp){
                  console.log('Error, object not found');
                  return;
                }
                temp.eleWeight=editWeight;
                temp.tertiaryElementName=editName;
                increamentCounter();
                setData(reg);
                handleCancel();
              }}>Edit</Button>
            </div>
            <div style={{position:'absolute',right:'10px',bottom:'10px'}}>
            <Button type="primary" onClick={()=>{

                let reg=cloneDeep(data);
                let found=false;
                for(let i of reg.subElementDTOList){
                  const initialLength = i.tertiaryElementDTOList.length;
                  i.tertiaryElementDTOList = i.tertiaryElementDTOList.filter(z => z.tertiaryElementId !== target.tertiaryElementId);
                  if(initialLength !== i.tertiaryElementDTOList.length) {
                    found=true;
                    break;
                  }
                }
                if(!found){
                  console.log('Error, object not found');
                  return;
                }

                increamentCounter();
                setData(reg);
                handleCancel();
              }}>Remove node</Button>
          </div>
          </div>
        }
        { addNode &&
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div>Indicator name</div>
        <Input placeholder="Sub element name" onChange={onChangeName} style={{ width: 200 }} />
        <div>Weight</div>
        <Input placeholder="Enter weight" onChange={onChangeWeight} style={{ width: 200 }} />
        <Button type="primary" disabled={isButtonDisabled} onClick={()=>{
          if(weight>100){
            message.error('Weight should be in range of 0 - 100');
            return;
          }
          let reg=cloneDeep(data);
          let temp=null;
          for(let i of reg.subElementDTOList){
            for(let j of i.tertiaryElementDTOList){
              if(j.tertiaryElementId==target.tertiaryElementId) {
                temp=j;

              }
            }
          }
          if(!temp){
            console.log('not found');
            return;
          }

          temp.indicatorDTOList.push({
            indicatorId:getTerId(),
            tertiaryElementId:target.tertiaryElementId,
            indicatorName:elementName,
            eleWeight:weight,
            iptValue:null
          })
          increamentCounter();
          setData(reg);
          handleCancel();
        }}>Add</Button>
          </div>
        }

      </div>

     );

}

const EditIndicator=({target,data,setData,handleCancel,increamentCounter}:any)=>{


  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(true);
  const [editName,setEditName]=useState('');
  const [editWeight,setEditWeight]=useState(0);

  useEffect(() => {

    if(editName.trim()!='' && !isNaN(editWeight) && editWeight >0) setIsEditButtonDisabled(false);
    else setIsEditButtonDisabled(true);
  }, [editName,editWeight]);


  const onEditName=(e)=>{
    setEditName(e.target.value.trim());
  }
  const onEditWeight=(e)=>{
    setEditWeight(parseFloat(e.target.value));
  }

  return (
    <div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

          <div style={{alignSelf:'flex-start'}}>Edit selected indicator name</div>
          <Input placeholder="Indicator name" onChange={onEditName} style={{ width: 200 }} />

          <div style={{alignSelf:'flex-start'}}>Edit selected indicator weight</div>
          <Input placeholder="Indicator weight" onChange={onEditWeight} style={{ width: 200 }} />
          <div>
            <Button type="primary" disabled={isEditButtonDisabled} onClick={()=>{
              if(editWeight>100){
                message.error('Weight should be in range of 0 - 100');
                return;
              }
              let reg=cloneDeep(data);
              let temp=null;
              for(let i of reg.subElementDTOList){
                if(temp) break;
                for(let j of i.tertiaryElementDTOList){
                  if(temp) break;
                  for(let z of j.indicatorDTOList){
                    if(z.indicatorId==target.indicatorId){
                      temp=z;
                      break;
                    }
                  }

                }
              }
              if(!temp){
                console.log('Error, object not found');
                return;
              }
              temp.eleWeight=editWeight;
              temp.indicatorName=editName;
              increamentCounter();
              setData(reg);
              handleCancel();
            }}>Edit</Button>
          </div>
          <div style={{position:'absolute',right:'10px',bottom:'10px'}}>
            <Button type="primary" onClick={()=>{
                let reg=cloneDeep(data);
                let found=false;
                for(let i of reg.subElementDTOList){
                  if(found) break;
                  for(let j of i.tertiaryElementDTOList){
                    if(found) break;
                    let preLen=j.indicatorDTOList.length;
                    j.indicatorDTOList = j.indicatorDTOList.filter(z => z.indicatorId !== target.indicatorId);
                    if(preLen!==j.indicatorDTOList.length){
                      found=true;
                      break;
                    }
                  }
                }
                if(!found){
                  console.log('Error, object not found');
                  return;
                }

                increamentCounter();
                setData(reg);
                handleCancel();
              }}>Remove node</Button>
          </div>
        </div>
      </div>

     );

}
export default ReportTable;

/*

*/

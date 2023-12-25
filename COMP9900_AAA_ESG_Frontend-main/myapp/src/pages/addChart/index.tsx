import { getFrameworkByIdUsingGET } from '@/services/ant-design-pro/frameworkController';
import { getDefaultFrameworkUsingGET,getUserDefinedFrameworkUsingGET } from '@/services/ant-design-pro/userController';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { ReportCardHeader } from '@/components';
import { Collapse, theme } from 'antd';
import { ModalSeparatorLine } from '@/components';
import React, { useEffect, useState } from 'react';



import { useModel } from '@umijs/max';

import ReportTable, {ReportTemplate} from './ReportTable';


import './index.less';

const handleAdd = async (fields: API.ReportDTO) => {
  const hide = message.loading('Adding');
  try {
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const getReportList = async () => {
  try {
    const reportList = await getFrameworkByIdUsingGET();
    return reportList;
  } catch (error) {
    const defaultRequestFailureMessage = 'Get Report Error!';
    console.log(error);
    message.error(defaultRequestFailureMessage);
  }
};

const addChart: React.FC = () => {
  const [reports, setReports] = useState<API.ReportDTO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [displayEditModle,setDisplayEditModal]= useState(false);
  const [frameworks, setFrameworks] = useState<API.FrameworkDTO[]>([]);
  const [userDefinedframeworks, setUserDefinedframeworks] = useState<API.FrameworkDTO[]>([]);
  const [currentSelectedFramework,setCurrentSelectedFramework]=useState({frameworkName:'None'});
  const { token } = theme.useToken();
  const [renderCount, setRenderCount] = useState(0);
  const { initialState } = useModel('@@initialState');
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const displayEdit =(framework:any)=>{
    if(isModalVisible)setIsModalVisible(false);
    setRenderCount(renderCount+1);
    setCurrentSelectedFramework(framework);
    console.log(framework)
    setDisplayEditModal(true);
  }


  const hideDisplayEdit =()=>{
    setDisplayEditModal(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReportsPromise = getReportList();
      const fetchedFrameworksPromise = getDefaultFrameworkUsingGET();
      const fetchedUserFrameworksPromise = getUserDefinedFrameworkUsingGET();

      const [fetchedReports, fetchedFrameworks, fetchedUserFrameworks] = await Promise.all([
        fetchedReportsPromise,
        fetchedFrameworksPromise,
        fetchedUserFrameworksPromise
      ]);
      let preDefinedReport={
        "companyName": "Apple",
        "userId": 1,
        "frameworkDTO": {
            "score": 22,
            "frameworkId": null,
            "frameworkName": "TCFD",
            "userId": 1,
            "subElementDTOList": [
                {
                    "score": 15,
                    "subElementId": 1,
                    "frameworkId": 1,
                    "subElementName": "Transition Risk",
                    "eleWeight": 1,
                    "tertiaryElementDTOList": [
                        {
                            "score": 98,
                            "tertiaryElementId": 1,
                            "subElementId": 1,
                            "tertiaryElementName": "Policy and Legal",
                            "eleWeight": 1,
                            "indicatorDTOList": [
                                {
                                    "score": 74,
                                    "indicatorId": null,
                                    "tertiaryElementId": 1,
                                    "indicatorName": "Increased pricing of GHG emissions",
                                    "eleWeight": 1,
                                    "iptValue": 2
                                },
                                {
                                    "score": 83,
                                    "indicatorId": null,
                                    "tertiaryElementId": 1,
                                    "indicatorName": "Enhanced emissions-reporting obligations",
                                    "eleWeight": 1,
                                    "iptValue": 4
                                }
                            ]
                        },
                        {
                            "score": 26,
                            "tertiaryElementId": 2,
                            "subElementId": 1,
                            "tertiaryElementName": "Technology",
                            "eleWeight": 1,
                            "indicatorDTOList": [
                                {
                                    "score": 3,
                                    "indicatorId": null,
                                    "tertiaryElementId": 2,
                                    "indicatorName": "Costs to transition to lower emissions technology",
                                    "eleWeight": 1,
                                    "iptValue": 2
                                }
                            ]
                        },
                        {
                            "score": 1,
                            "tertiaryElementId": 3,
                            "subElementId": 1,
                            "tertiaryElementName": "Market",
                            "eleWeight": 1,
                            "indicatorDTOList": [
                                {
                                    "score": 93,
                                    "indicatorId": null,
                                    "tertiaryElementId": 3,
                                    "indicatorName": "Uncertainty in market signals",
                                    "eleWeight": 1,
                                    "iptValue": 1
                                }
                            ]
                        },
                        {
                            "score": 6,
                            "tertiaryElementId": 4,
                            "subElementId": 1,
                            "tertiaryElementName": "Reputation",
                            "eleWeight": 1,
                            "indicatorDTOList": [
                                {
                                    "score": 23,
                                    "indicatorId": null,
                                    "tertiaryElementId": 4,
                                    "indicatorName": "Increased stakeholder concern or negative stackholder feedback",
                                    "eleWeight": 1,
                                    "iptValue": 6
                                }
                            ]
                        }
                    ]
                },
                {
                    "score": 7,
                    "subElementId": 2,
                    "frameworkId": 1,
                    "subElementName": "Physical Risk",
                    "eleWeight": 1,
                    "tertiaryElementDTOList": [
                        {
                            "score": 2,
                            "tertiaryElementId": 5,
                            "subElementId": 2,
                            "tertiaryElementName": "Acute",
                            "eleWeight": 1,
                            "indicatorDTOList": [
                                {
                                    "score": 51,
                                    "indicatorId": null,
                                    "tertiaryElementId": 5,
                                    "indicatorName": "Increased Increased severity of extreme weather events such as cyclones and floods",
                                    "eleWeight": 1,
                                    "iptValue": 2
                                }
                            ]
                        },
                        {
                            "score": 5,
                            "tertiaryElementId": 6,
                            "subElementId": 2,
                            "tertiaryElementName": "Chronic",
                            "eleWeight": 1,
                            "indicatorDTOList": [
                                {
                                    "score": 68,
                                    "indicatorId": null,
                                    "tertiaryElementId": 6,
                                    "indicatorName": "Rising mean temperatures",
                                    "eleWeight": 1,
                                    "iptValue": 5
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
      setReports(fetchedReports && fetchedReports.length!=0 ? fetchedReports:[preDefinedReport]);
      setFrameworks(fetchedFrameworks || []);
      setUserDefinedframeworks(fetchedUserFrameworks || []);
    };

    fetchData();
  }, [renderCount,displayEditModle]);

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          title: 'Existing Report',
          ghost: true,

          extra: [
            <Button key="1" type="primary" onClick={showModal}>
              New Report
            </Button>,
          ],
        }}
        tabProps={{
          type: 'editable-card',
          hideAdd: false,
          onEdit: (e : any, action: any) => console.log(e, action),
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <Collapse accordion bordered={false} style={{ background: '#F5F7FA' }} expandIconPosition={'end'} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}  items={reports.map((report, idx) => (
            {
              key: idx,
              label: <ReportCardHeader companyName={report.companyName} frameworkName={report.frameworkDTO.frameworkName} score=''></ReportCardHeader>,
              children: <ReportTable report={report} />,
              style:{ border:'none',marginBottom: 24,background: token.colorFillAlter,borderRadius: token.borderRadiusLG,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}
            }

          ))}/>


        </ProCard>

      </PageContainer>


      <Modal title="New Report" visible={isModalVisible} onCancel={handleCancel}>
        <div style={{marginTop:'30px'}}>
          <ModalSeparatorLine title='Default frameworks'/>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {frameworks.map((framework, idx) => (
                <div key={idx} style={{ flex: '0 0 50%', padding: '5px', boxSizing: 'border-box' }} onClick={()=>{displayEdit(framework)}}>
                  <div style={{ background: '#e5e5e5', padding: '10px', borderRadius: '5px' }}>
                    {framework.frameworkName}
                  </div>

                </div>
              ))}
              <ModalSeparatorLine title='User defined frameworks'/>
              {userDefinedframeworks.map((framework, idx) => (
                <div key={idx} style={{ flex: '0 0 50%', padding: '5px', boxSizing: 'border-box' }}  onClick={()=>{displayEdit(framework)}}>
                  <div style={{ background: '#e5e5e5', padding: '10px', borderRadius: '5px' }}>
                    {framework.frameworkName}
                  </div>

                </div>
              ))}


            </div>
        </div>

      </Modal>
      <Modal destroyOnClose title={currentSelectedFramework.frameworkName} visible={displayEditModle}  width='2000px'  onCancel={hideDisplayEdit}>
        <ReportTemplate framework={currentSelectedFramework} companyNameIpt='' userId={initialState?.currentUser ?initialState?.currentUser.userId:''} hideDisplayEdit={hideDisplayEdit}/>
      </Modal>
    </div>
  );
};

export default addChart;

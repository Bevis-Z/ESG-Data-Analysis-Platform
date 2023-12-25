import {getDefaultFrameworkUsingGET, getUserDefinedFrameworkUsingGET} from '@/services/ant-design-pro/userController';
import {BulbOutlined, EditOutlined} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {Button, Card, message, Modal, notification, theme, Tooltip} from 'antd';
import React, { useEffect, useState } from 'react';
import {DemoDecompositionTreeGraph} from '@/components';
import {useModel} from "@@/exports";
import FrameworkModalContent from './FrameworkModalContent';
import {editFrameworkUsingPOST, insertFrameworkTreeUsingPOST} from "@/services/ant-design-pro/frameworkController";

const InfoCard: React.FC<{
  title: string;
  index: number;
  data: any;
  onEdit?: () => void;
  isUserDefined?: boolean;
}> = ({ title, index, data, onEdit, isUserDefined }) => {
  const { useToken } = theme;
  const { token } = useToken();
  const { initialState } = useModel('@@initialState');

  const userId = initialState?.currentUser?.userId;

  const titleStyle = {
    fontSize: '16px',
    color: isUserDefined ? 'blue' : token.colorText,
    flex: 1,
    marginLeft: 10,
  };
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        padding: '16px 19px',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          lineHeight: '22px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage: "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div style={titleStyle}
        >
          {isUserDefined ? (
            <Tooltip title="This is a custom framework reporting framework">
              <BulbOutlined style={{ marginRight: 4 }} />
              {title}
            </Tooltip>
          ) : (
            title
          )}
        </div>

        {data.userId===userId  &&
          <Button
          icon={<EditOutlined/>}
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            if (onEdit) onEdit();
          }}
          style={{marginLeft: 10}}
        >
          Edit
        </Button>
        }
      </div>
      {expanded && <DemoDecompositionTreeGraph data={data} />}
    </div>
  );
};




const Framework: React.FC = () => {
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const [cards, setCards] = useState<API.FrameworkDTO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());
  const userId = initialState?.currentUser?.userId;


  const [frameworkData, setFrameworkData] = useState({
    frameworkId: 0,
    frameworkName: '',
    subElementDTOList: [{}]
  });

  function handleEditClick(cardData) {
    setFrameworkData(cardData);
    setIsModalVisible(true);
  }

  const handleDataChange = (newData) => {
    setFrameworkData(newData);
  };

  const createFramework = async () => {
    if (!validateAllWeights()) {
      message.error('All weights must be between 0 and 100');
      return;
    }
    setLoading(true);
    try {
      await insertFrameworkTreeUsingPOST(frameworkData);
      setIsModalVisible(false);
      message.success('Successfully created the framework!');
      async function fetchData() {
        try {

          const [response1, response2] = await Promise.all([
            userId===1 ? []:getDefaultFrameworkUsingGET(),
            getUserDefinedFrameworkUsingGET()
          ]);

          const userDefinedFrameworks = response2.map(framework => ({ ...framework, isUserDefined: true }));


          const combinedData = [...response1, ...userDefinedFrameworks];
          setCards(combinedData);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      fetchData();
      setResetKey(Date.now());
      setFrameworkData({
        frameworkId: 0,
        frameworkName: '',
        subElementDTOList: [{}]
      });
    } catch (error) {
      const errorMsg = error.message || "Something went wrong!";
      notification.error({
        message: 'Failed to Create Framework',
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFramework = async (data) => {
    if (!validateAllWeights()) {
      message.error('All weights must be between 0 and 100');
      return;
    } else {
      setLoading(true);
      try {
        await editFrameworkUsingPOST(data);
        setIsModalVisible(false);
        message.success('Successfully updated the framework!');
        setResetKey(Date.now());
        setFrameworkData({
          frameworkId: 0,
          frameworkName: '',
          subElementDTOList: [{}]
        });
      } catch (error) {
        const errorMsg = error.message || "Something went wrong!";
        notification.error({
          message: 'Failed to Update Framework',
          description: errorMsg,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateAllWeights = () => {
    for (const subElement of frameworkData.subElementDTOList) {
      if (subElement.eleWeight < 0 || subElement.eleWeight > 100) {
        return false;
      }
      for (const tertiaryElement of subElement.tertiaryElementDTOList || []) {
        if (tertiaryElement.eleWeight < 0 || tertiaryElement.eleWeight > 100) {
          return false;
        }
        for (const indicator of tertiaryElement.indicatorDTOList || []) {
          if (indicator.eleWeight < 0 || indicator.eleWeight > 100) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleSaveFramework = async () => {
    try {
      if (frameworkData.frameworkId === 0) {
        await createFramework(frameworkData);
      } else {
        await updateFramework(frameworkData); // Call the update method if an ID exists
      }

      const [response1, response2] = await Promise.all([
        getDefaultFrameworkUsingGET(),
        getUserDefinedFrameworkUsingGET()
      ]);

      const combinedData = [...response1, ...response2];
      setCards(combinedData);
    } catch (error) {
      console.error('Error saving framework:', error);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };



  const handleCancel = () => {
    setIsModalVisible(false);
    setResetKey(Date.now());
    setFrameworkData({
      frameworkId: 0,
      frameworkName: '',
      subElementDTOList: [{}]
    });
  };

  useEffect(() => {
    const userId = initialState?.currentUser?.userId;

    async function fetchData() {
      try {

        const [response1, response2] = await Promise.all([
          userId===1 ? []:getDefaultFrameworkUsingGET(),
          getUserDefinedFrameworkUsingGET()
        ]);

        const userDefinedFrameworks = response2.map(framework => ({ ...framework, isUserDefined: true }));


        const combinedData = [...response1, ...userDefinedFrameworks];
        setCards(combinedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, [isModalVisible]);

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',

          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <div
              style={{
                fontSize: '20px',
                color: token.colorTextHeading,
              }}
            >
              Welcome use UNSW ESG Management Web Platform.
            </div>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={showModal}
              style={{ marginLeft: 10 }}
            >
              Custom Framework
            </Button>
          </div>
          <div
            style={{
              paddingTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {cards.map((card, index) => (
              <InfoCard
                key={index}
                index={index + 1}
                title={card.frameworkName}
                data={card}
                isUserDefined={card.isUserDefined}
                onEdit={() => handleEditClick(card)}
              />
            ))}
          </div>
        </div>
        <Modal
          title={frameworkData.frameworkId === 0 ? "Create New Framework" : "Edit Framework"}
          open={isModalVisible}
          onOk={handleSaveFramework}
          onCancel={handleCancel}
          width='1200px'
          footer={
            []
          }
        >
          <div className={'createNewFramework'}>
          </div>
          <div className={'displayFramework'}>
            <FrameworkModalContent data={frameworkData} onDataChange={handleDataChange} key={resetKey}/>
          </div>
          <div className={'actionBox'}>
            <Button
              type="primary"
              onClick={handleSaveFramework}
              style={{ marginLeft: 10 }}
            >
              Confirm
            </Button>
            <Button
              type="default"
              onClick={handleCancel}
              style={{ marginLeft: 10 }}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </Card>
    </PageContainer>
  );
};

export default Framework;

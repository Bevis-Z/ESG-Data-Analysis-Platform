import React from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';

export const DemoDecompositionTreeGraph = (props) => {

  // Transfer Data
  const convertToTreeData = (sourceData) => {
    const createIndicatorNode = (indicator) => ({
      id: `Indi${indicator.indicatorId}`,
      value: {
        title: indicator.indicatorName,
        items: [{ text: indicator.iptValue || '' }],
      }
    });

    const createTertiaryNode = (tertiaryElement) => ({
      id: `Teri${tertiaryElement.tertiaryElementId}`,
      value: {
        title: tertiaryElement.tertiaryElementName,
        items: [
          { text: tertiaryElement.score || '' },
          { text: 'Weight', value: `${tertiaryElement.eleWeight}%` },
        ],
      },
      children: tertiaryElement.indicatorDTOList.map(createIndicatorNode)
    });

    const createSubElementNode = (subElement) => ({
      id: `Sub${subElement.subElementId}`,
      value: {
        title: subElement.subElementName,
        items: [
          { text: subElement.score || '' },
          { text: 'Weight', value: `${subElement.eleWeight}%` },
        ],
      },
      children: subElement.tertiaryElementDTOList.map(createTertiaryNode)
    });

    return {
      id: 'A0',
      value: {
        title: sourceData.frameworkName,
        items: [{ text: '' }],
      },
      children: sourceData.subElementDTOList.map(createSubElementNode)
    };
  };

  const treeData = convertToTreeData(props.data);


  const data = treeData;


  const config = {
    data,
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    nodeCfg: {
      title: {
        containerStyle: {
          fill: 'transparent',
        },
        style: {
          fill: '#000',
        },
      },
      items: {
        containerStyle: {
          fill: '#fff',
        },
        style: (cfg, group, type) => {
          const styles = {
            icon: {
              width: 10,
              height: 10,
            },
            value: {
              fill: '#52c41a',
            },
            text: {
              fill: '#aaa',
            },
          };
          return styles[type];
        },
      },
      style: {
        stroke: 'transparent',
      },
      nodeStateStyles: false,
    },
    edgeCfg: {
      endArrow: {
        show: false,
      },
      style: (item, graph) => {
        /**
         * graph.findById(item.target).getModel()
         * item.source:
         */
        return {
          stroke: '#40a9ff',
          lineWidth: Math.random() * 10 + 1,
          strokeOpacity: 0.5,
        };
      },
      edgeStateStyles: false,
    },
  };
  // @ts-ignore
  return <DecompositionTreeGraph {...config} />;
};




// @ts-ignore
export const CreateDecompositionTreeGraph = (props) => {
  // Transfer Data
  // @ts-ignore
  const convertToTreeData = (sourceData) => {
    let subCounter = 0;
    let teriCounter = 0;
    let indiCounter = 0;

    // @ts-ignore
    const createIndicatorNode = (indicator) => {
      if (!indicator || !indicator.indicatorName) return null;
      indiCounter++;
      return {
        id: `Indi${indiCounter}`,
        value: {
          title: indicator.indicatorName,
          items: [ { text: 'Weight', value: `${indicator.eleWeight || '0'}%` }],
        }
      };
    };
    // @ts-ignore
    const createTertiaryNode = (tertiaryElement) => {
      if (!tertiaryElement || !tertiaryElement.tertiaryElementName) return null;
      teriCounter++;
      const children = (tertiaryElement.indicatorDTOList || []).map(createIndicatorNode).filter(Boolean);
      return {
        id: `Teri${teriCounter}`,
        value: {
          title: tertiaryElement.tertiaryElementName,
          items: [
            { text: tertiaryElement.score || '' },
            { text: 'Weight', value: `${tertiaryElement.eleWeight || '0'}%` },
          ],
        },
        children: children
      };
    };
    const createSubElementNode = (subElement) => {
      if (!subElement || !subElement.subElementName) return null;
      subCounter++;
      const children = (subElement.tertiaryElementDTOList || []).map(createTertiaryNode).filter(Boolean);
      return {
        id: `Sub${subCounter}`,
        value: {
          title: subElement.subElementName,
          items: [
            { text: subElement.score || '' },
            { text: 'Weight', value: `${subElement.eleWeight || '0'}%` },
          ],
        },
        children: children
      };
    };

    const children = (sourceData.subElementDTOList || []).map(createSubElementNode).filter(Boolean);
    if (!children.length && !sourceData.frameworkName) return null;

    return {
      id: "0",
      value: {
        title: sourceData.frameworkName,
        items: [{ text: '' }],
      },
      children: children
    };
  };


  const defaultData = {
    value: {
      title: 'Framework Name',
      items: [{ text: 'Dynamic graph' }],
    },
    children: [
      {
        value: {
          title: 'Default Area',
          items: [

            { text: 'Drag to see details' },
          ],
        },
        children: [
          {
            value: {
              title: 'Default Metrics Element',
              items: [

                { text: 'Weight', value: '50%' },
              ],
            },
            children: [
              {
                value: {
                  title: 'Default Indicator',
                  items: [{ text: 'Default Indicator Weight' }],
                }
              }
            ]
          }
        ]
      }
    ]
  };


  const data = convertToTreeData(props.data) || defaultData;


  const config = {
    data,
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    width: 1100,
    nodeCfg: {
      title: {
        containerStyle: {
          fill: 'transparent',
        },
        style: {
          fill: '#000',
        },
      },
      items: {
        containerStyle: {
          fill: '#fff',
        },
        style: (cfg, group, type) => {
          const styles = {
            icon: {
              width: 10,
              height: 10,
            },
            value: {
              fill: '#52c41a',
            },
            text: {
              fill: '#aaa',
            },
          };
          return styles[type];
        },
      },
      style: {
        stroke: 'transparent',
      },
      nodeStateStyles: false,
    },
    edgeCfg: {
      endArrow: {
        show: false,
      },
      style: (item, graph) => {
        /**
         * graph.findById(item.target).getModel()
         * item.source: get source data
         * item.target: Request target Data
         */
        return {
          stroke: '#40a9ff',
          lineWidth: Math.random() * 10 + 1,
          strokeOpacity: 0.5,
        };
      },
      edgeStateStyles: false,
    },
  };
  // @ts-ignore
  return <DecompositionTreeGraph {...config} />;
};


import { Flex, Table, Tag, Typography } from 'antd';
import { COLORS } from '../utils/utils';

const { Text } = Typography;

function renderColumn(element, type, disciplines, primaryColor) {
  if (!element || !element.length) {
    return '';
  }
  let data = {
    discipline: '',
    block: '',
    class: '',
  };
  const splittedElement = element.split('|');
  data.discipline = splittedElement[0].trim();
  data.block = splittedElement[1].trim();
  data.class = splittedElement[2].trim();
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={5}
    >
      <Tag
        style={{
          fontWeight: 600,
          maxWidth: 100,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginInlineEnd: 0,
        }}
        color={type === 1 ? primaryColor : COLORS[disciplines.findIndex((value) => data.discipline.includes(value))]}
      >
        {data.discipline}
      </Tag>
      <Text>
        <Text style={{ fontWeight: 600 }}>{data.block}</Text> - {data.class}
      </Text>
    </Flex>
  );
}

export default function ResultTable({ dataSource, loading, type, disciplines, tableColumns, primaryColor }) {
  return (
    <Table
      style={{ width: '80%', marginTop: 20 }}
      scroll={{ y: '50vh', x: 800 }}
      dataSource={dataSource}
      loading={loading}
      bordered
      columns={[
        {
          title: 'Horários',
          dataIndex: 'time',
          key: 'time',
          align: 'center',
        },
        {
          title: 'Segunda-feira',
          dataIndex: 'monday',
          key: 'monday',
          align: 'center',
          render: (element) => renderColumn(element, type, disciplines, primaryColor),
          hidden: !tableColumns.includes(1),
        },
        {
          title: 'Terça-feira',
          dataIndex: 'tuesday',
          key: 'tuesday',
          align: 'center',
          render: (element) => renderColumn(element, type, disciplines, primaryColor),
          hidden: !tableColumns.includes(2),
        },
        {
          title: 'Quarta-feira',
          dataIndex: 'wednesday',
          key: 'wednesday',
          align: 'center',
          render: (element) => renderColumn(element, type, disciplines, primaryColor),
          hidden: !tableColumns.includes(3),
        },
        {
          title: 'Quinta-feira',
          dataIndex: 'thursday',
          key: 'thursday',
          align: 'center',
          render: (element) => renderColumn(element, type, disciplines, primaryColor),
          hidden: !tableColumns.includes(4),
        },
        {
          title: 'Sexta-feira',
          dataIndex: 'friday',
          key: 'friday',
          align: 'center',
          render: (element) => renderColumn(element, type, disciplines, primaryColor),
          hidden: !tableColumns.includes(5),
        },
        {
          title: 'Sábado',
          dataIndex: 'saturday',
          key: 'saturday',
          align: 'center',
          render: (element) => renderColumn(element, type, disciplines, primaryColor),
          hidden: !tableColumns.includes(6),
        },
      ]}
      pagination={false}
    />
  );
}

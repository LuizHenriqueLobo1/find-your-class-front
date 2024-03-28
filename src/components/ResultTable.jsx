import { Flex, Table, Tag, Typography } from 'antd';

const { Text } = Typography;

function renderColumn(element, type) {
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
        style={{ fontWeight: 600 }}
        color={type === 1 ? '#5a54f9' : ''}
      >
        {data.discipline}
      </Tag>
      <Text>
        <Text style={{ fontWeight: 600 }}>{data.block}</Text> - {data.class}
      </Text>
    </Flex>
  );
}

export default function ResultTable({ dataSource, loading, type }) {
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
          render: (element) => renderColumn(element, type),
        },
        {
          title: 'Terça-feira',
          dataIndex: 'tuesday',
          key: 'tuesday',
          align: 'center',
          render: (element) => renderColumn(element, type),
        },
        {
          title: 'Quarta-feira',
          dataIndex: 'wednesday',
          key: 'wednesday',
          align: 'center',
          render: (element) => renderColumn(element, type),
        },
        {
          title: 'Quinta-feira',
          dataIndex: 'thursday',
          key: 'thursday',
          align: 'center',
          render: (element) => renderColumn(element, type),
        },
        {
          title: 'Sexta-feira',
          dataIndex: 'friday',
          key: 'friday',
          align: 'center',
          render: (element) => renderColumn(element, type),
        },
        {
          title: 'Sábado',
          dataIndex: 'saturday',
          key: 'saturday',
          align: 'center',
          render: (element) => renderColumn(element, type),
        },
      ]}
      pagination={false}
    />
  );
}

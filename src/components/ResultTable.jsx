import { Col, Flex, Row, Table, Tag, Typography } from 'antd';
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
          textAlign: 'center',
          fontWeight: 600,
          whiteSpace: 'wrap',
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

export default function ResultTable({
  dataSource,
  loading,
  type,
  disciplines,
  tableColumns,
  primaryColor,
  disciplineName,
}) {
  return (
    <Row
      style={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Col
        xs={23}
        sm={20}
      >
        {disciplineName && (
          <Text style={{ marginLeft: 16 }}>
            <span style={{ fontWeight: 600 }}>Disciplina</span>: {disciplineName}
          </Text>
        )}
        <Table
          style={{ marginTop: 20 }}
          scroll={{ y: 'calc(100vh - 364px)', x: 800 }}
          dataSource={dataSource}
          loading={loading}
          bordered
          columns={[
            {
              width: 58,
              title: ' ',
              dataIndex: 'time',
              key: 'time',
              align: 'center',
              fixed: 'left',
              render: (value) => <div style={{ writingMode: 'sideways-lr', fontWeight: 600 }}>{value}</div>,
            },
            {
              title: 'Segunda',
              dataIndex: 'monday',
              key: 'monday',
              align: 'center',
              render: (element) => renderColumn(element, type, disciplines, primaryColor),
              hidden: !tableColumns.includes(1),
            },
            {
              title: 'Terça',
              dataIndex: 'tuesday',
              key: 'tuesday',
              align: 'center',
              render: (element) => renderColumn(element, type, disciplines, primaryColor),
              hidden: !tableColumns.includes(2),
            },
            {
              title: 'Quarta',
              dataIndex: 'wednesday',
              key: 'wednesday',
              align: 'center',
              render: (element) => renderColumn(element, type, disciplines, primaryColor),
              hidden: !tableColumns.includes(3),
            },
            {
              title: 'Quinta',
              dataIndex: 'thursday',
              key: 'thursday',
              align: 'center',
              render: (element) => renderColumn(element, type, disciplines, primaryColor),
              hidden: !tableColumns.includes(4),
            },
            {
              title: 'Sexta',
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
      </Col>
    </Row>
  );
}

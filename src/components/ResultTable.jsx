import { Table } from 'antd';

export default function ResultTable({ dataSource, loading }) {
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
        },
        {
          title: 'Terça-feira',
          dataIndex: 'tuesday',
          key: 'tuesday',
          align: 'center',
        },
        {
          title: 'Quarta-feira',
          dataIndex: 'wednesday',
          key: 'wednesday',
          align: 'center',
        },
        {
          title: 'Quinta-feira',
          dataIndex: 'thursday',
          key: 'thursday',
          align: 'center',
        },
        {
          title: 'Sexta-feira',
          dataIndex: 'friday',
          key: 'friday',
          align: 'center',
        },
        {
          title: 'Sábado',
          dataIndex: 'saturday',
          key: 'saturday',
          align: 'center',
        },
      ]}
      pagination={false}
    />
  );
}

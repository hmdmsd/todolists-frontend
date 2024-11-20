import { Form, Input, Button } from "antd";

interface ListFormProps {
  onSubmit: (name: string, description?: string) => Promise<void>;
  onCancel?: () => void;
}

export const ListForm = ({ onSubmit, onCancel }: ListFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={async (values) => {
        await onSubmit(values.name, values.description);
        form.resetFields();
      }}
    >
      <Form.Item
        name="name"
        label="List Name"
        rules={[{ required: true, message: "Please enter a list name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create List
        </Button>
        {onCancel && (
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

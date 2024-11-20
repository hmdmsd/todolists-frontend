import { Form, Input, Button } from "antd";

interface TodoFormProps {
  onSubmit: (description: string) => Promise<void>;
  onCancel?: () => void;
}

export const TodoForm = ({ onSubmit, onCancel }: TodoFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={async (values) => {
        await onSubmit(values.description);
        form.resetFields();
      }}
    >
      <Form.Item
        name="description"
        label="Todo Description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Todo
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

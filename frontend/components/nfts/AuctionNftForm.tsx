import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

/* eslint-enable no-template-curly-in-string */

const AuctionNftForm = (props: any) => {
  const onFinish = (values: any) => {
    console.log(values, "values");

    props.onAuctionNft(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="expiry"
        label="Expiry"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="startingPrice"
        label="Starting Price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="bidRoyaltyFee"
        label="Royalty Fee"
        initialValue={2.5}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          min={0}
          max={10}
          formatter={(value) => `${value}%`}
          parser={(value: any) => value.replace("%", "")}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={props.loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuctionNftForm;

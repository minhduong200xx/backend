"use client";
import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col, DatePicker } from "antd";
import moment from "moment";
import type { StockTransaction } from "@/app/types/type";

interface StockTransactionsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedTransaction: StockTransaction | null;
  onSave: (updatedTransaction: StockTransaction) => void;
  form: any;
}

const StockTransactionsModal: React.FC<StockTransactionsModalProps> = ({
  visible,
  onClose,
  selectedTransaction,
  onSave,
  form,
}) => {
  useEffect(() => {
    if (selectedTransaction) {
      form.setFieldsValue({
        ...selectedTransaction,
        transaction_date: selectedTransaction.transaction_date
          ? moment(selectedTransaction.transaction_date)
          : null,
      });
    }
  }, [selectedTransaction, form]);

  const handleSave = () => {
    form.validateFields().then((values: any) => {
      const updatedTransaction = {
        ...values,
        transaction_date: values.transaction_date
          ? values.transaction_date.toISOString()
          : null,
      };
      onSave(updatedTransaction as StockTransaction);
    });
  };

  return (
    <Modal
      title={selectedTransaction ? "Edit Transaction" : "Add Transaction"}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Transaction ID"
              name="transaction_id"
              rules={[
                { required: true, message: "Please input the transaction ID!" },
              ]}
            >
              <Input disabled={!!selectedTransaction} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Transaction Date"
              name="transaction_date"
              rules={[
                {
                  required: true,
                  message: "Please input the transaction date!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Transaction Type"
              name="transaction_type"
              rules={[
                {
                  required: true,
                  message: "Please input the transaction type!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input the quantity!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Medicine ID"
          name="medicine_id"
          rules={[{ required: true, message: "Please input the medicine ID!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StockTransactionsModal;

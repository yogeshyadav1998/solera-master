import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Drawer, Button, Tabs, Row, Radio, Checkbox, Divider } from "antd";
import { FilterOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const prescriptionOptions = ["Required", "Not-required"];
const productFormOptions = ["Tablet", "Syrup", "Kit", "Tablet SR", "Capsule", "Tablet MD"];
const dosageOptions = ["10 mg", "20 mg", "40 mg", "80 mg"];
const brandOptions = ["Cipla", "Mankind", "Abott"];
const FormulaResult = () => {
    const [visible, setVisible] = useState(false);
    const [sortby, setSortBy] = useState(1);
    const handleSortByChange = e => {
        setSortBy(e.target.value);
    };
    const onBrandChange = checkedValues => {
        console.log("checked = ", checkedValues);
    };
    const onProductFormChange = checkedValues => {
        console.log("checked = ", checkedValues);
    };
    const onDosageFormChange = checkedValues => {
        console.log("checked = ", checkedValues);
    };
    const onPrescriptionChange = checkedValues => {
        console.log("checked = ", checkedValues);
    };
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <Row>
            <Button onClick={showDrawer} icon={<FilterOutlined />}>
                Filter
      </Button>
            <Drawer
                title="Sort and Filter"
                placement="bottom"
                closable={false}
                onClose={onClose}
                visible={visible}
                height={"64%"}>
                <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: "78%" }}>
                    <TabPane tab="Sort by" key="1">
                        <Radio.Group
                            onChange={handleSortByChange}
                            value={sortby}
                            style={{ display: "flex", flexDirection: "column" }}>
                            <Row className="sort-and-filter">
                                <Radio value={1}>Popularity</Radio>
                                <Radio value={2}>Rating: High to Low</Radio>
                                <Radio value={3}>Cost: Low to High</Radio>
                                <Radio value={4}>Cost: High to Low</Radio>
                            </Row>
                        </Radio.Group>
                    </TabPane>
                    <TabPane tab="Brand" key="2">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group options={brandOptions} onChange={onBrandChange} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Product Form" key="3">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={productFormOptions}
                                onChange={onProductFormChange}/>
                        </Row>
                    </TabPane>
                    <TabPane tab="Dosage" key="4">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={dosageOptions}
                                onChange={onDosageFormChange}/>
                        </Row>
                    </TabPane>
                    <TabPane tab="Prescription" key="5">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={prescriptionOptions}
                                onChange={onPrescriptionChange}/>
                        </Row>
                    </TabPane>
                </Tabs>
                <Divider />
                <Row className="sort-and-filter-button">
                    <Button size="large" style={{ width: 150 }}>
                        Clear All
                    </Button>
                    <Button size="large" style={{ width: 150 }} type="primary">
                        Apply
                    </Button>
                </Row>
            </Drawer>
        </Row>
    );
};
export default FormulaResult
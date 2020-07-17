import React, { useState } from "react";
import "antd/dist/antd.css";
import "./FormulaResult.css";
import { Drawer, Button, Tabs, Row, Radio, Checkbox, Divider, Card, Typography, Avatar } from "antd";
import { FilterOutlined, ExperimentOutlined, MedicineBoxOutlined } from "@ant-design/icons";
const { Text } = Typography;
const { TabPane } = Tabs;
let filterData = { sortby: [], brand: [], productForm: [], dosage: [], prescription: [] }
// Filter and Sorter Component starts here
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const prescriptionOptions = ["Required", "Not-required"];
const productFormOptions = ["Tablet", "Syrup", "Kit", "Tablet SR", "Capsule", "Tablet MD"];
const dosageOptions = ["10 mg", "20 mg", "40 mg", "80 mg"];
const brandOptions = ["Cipla", "Mankind", "Abott"];
const SortAndFilter = (props) => {
    const [visible, setVisible] = useState(false);
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
                            onChange={props.handleSortByChange}
                            value={props.sortby}
                            style={{ display: "flex", flexDirection: "column" }}>
                            <Row className="sort-and-filter">
                                <Radio value="Popularity">Popularity</Radio>
                                <Radio value="Rating: High to Low">Rating: High to Low</Radio>
                                <Radio value="Cost: Low to High">Cost: Low to High</Radio>
                                <Radio value="Cost: High to Low">Cost: High to Low</Radio>
                            </Row>
                        </Radio.Group>
                    </TabPane>
                    <TabPane tab="Brand" key="2">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group options={brandOptions} onChange={props.onBrandChange} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Product Form" key="3">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={productFormOptions}
                                onChange={props.onProductFormChange} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Dosage" key="4">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={dosageOptions}
                                onChange={props.onDosageChange} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Prescription" key="5">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={prescriptionOptions}
                                onChange={props.onPrescriptionChange} />
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Filter and Sorter Component ends here

// FormulaResult Screen Component starts here
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const FormulaResult = () => {
    const [sortby, setSortBy] = useState("Popularity");
    const [prescription, setPrescription] = useState([]);
    const [productForm, setProductForm] = useState([]);
    const [dosage, setDosage] = useState([]);
    const [brand, setBrand] = useState([]);
    const handleSortByChange = e => {
        setSortBy(e.target.value);
        filterData.sortby = e.target.value
    };
    const onBrandChange = checkedValues => {
        setBrand(checkedValues);
        filterData.brand = checkedValues
    };
    const onProductFormChange = checkedValues => {
        setProductForm(checkedValues);
        filterData.productform = checkedValues
    };
    const onDosageChange = checkedValues => {
        setDosage(checkedValues);
        filterData.dosage = checkedValues
    };
    const onPrescriptionChange = checkedValues => {
        setPrescription(checkedValues);
        filterData.prescription = checkedValues
    };
    return (
        <Row className="formulaResult-main-view">
            <Row className="formulaResult-top-row">
                <SortAndFilter sortby={sortby} handleSortByChange={handleSortByChange} onBrandChange={onBrandChange} onProductFormChange={onProductFormChange} onDosageChange={onDosageChange} onPrescriptionChange={onPrescriptionChange} />
                <Text code style={{ color: '#40a9ff' }}>Sort By {sortby}</Text>
                {
                    productForm.length ? productForm.map(productForm => <Text code style={{ color: '#40a9ff' }} key={productForm}>{productForm}</Text>) : null
                }
                {
                    dosage.length ? dosage.map(dosage => <Text code style={{ color: '#40a9ff' }} key={dosage}>{dosage}</Text>) : null
                }
                {
                    prescription.length ? prescription.map(prescription => <Text code style={{ color: '#40a9ff' }} key={prescription}>{prescription}</Text>) : null
                }
                {
                    brand.length ? brand.map(brand => <Text code style={{ color: '#40a9ff' }} key={brand}>{brand}</Text>) : null
                }
            </Row>
            <Row>
                <Card size="small"
                    title={<React.Fragment>
                        <ExperimentOutlined />&nbsp;&nbsp;Formula Title
                           </React.Fragment>}
                    loading={true} bordered={true} style={{ width: 260, margin: 15 }}>
                    <Text type="secondary">Ant Design</Text>
                </Card>

                {[...Array(30).keys()].map(i => (
            <Row key={i} style={{ margin: 15, alignItems: 'center', display: 'flex', flexDirection: 'row', border:'1px solid #f0f0f0', padding: 15 }}>
                    <Row style={{ display: 'flex', flexDirection: 'column', width: 105}}>
                        <Text strong style={{ fontSize: 14 }}>Aztor 40mg</Text><br />
                        <Text type="secondary" style={{ fontSize: 11, marginTop: -24 }}>Mfr: Noel pharma</Text>
                        <Avatar shape="square" size={96} icon={<MedicineBoxOutlined />} />
                    </Row>
                    <Divider type="vertical" style={{ height:120 }} />
                    <Row style={{ display: 'flex', flexDirection: 'column' }}>
                        <Radio.Group defaultValue="a" size="small" style={{ display: 'flex', flexDirection: 'column' }}>
                            <Radio.Button value="a" style={{ margin: 4, fontSize: 11 }}>Netmeds: ₹300</Radio.Button>
                            <Radio.Button value="b" style={{ margin: 4, fontSize: 11 }}>Medlife: ₹320</Radio.Button>
                            <Radio.Button value="c" style={{ margin: 4, fontSize: 11 }}>1mg: ₹330</Radio.Button>
                        </Radio.Group>
                        <Button type="primary" size="small" style={{ width:100, marginLeft:3 }}>
                            Add
                        </Button>
                    </Row>
                </Row>
          ))}
            </Row>
        </Row>
    )
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FormulaResult Screen Component ends here
export default FormulaResult
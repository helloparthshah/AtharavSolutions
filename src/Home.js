import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Home() {
    return (
        <Container fluid="md" className='cont'>
            <Container>
                <Row>
                    <Col fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formCode">
                                <Form.Label>Enter Code:</Form.Label>
                                <Form.Control as="textarea" rows="10" type="text" placeholder="Code" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formCode">
                                <Form.Label>Modified Code:</Form.Label>
                                <Form.Control as="textarea" rows="10" disabled type="text" placeholder="Code" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Home;
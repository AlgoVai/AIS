import { useState } from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import createInstitution from "../../services/Administrations/InstituteServices"
import toast, { Toaster } from "react-hot-toast";

function Institution() {

  const [insData, setData] = useState({
    Name: "",
    Address: "",
    url: null,
    IsActive: false,
  })

  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setData({ ...insData, IsActive: checked })
    } else {
      setData({ ...insData, [name]: value })
      setErrors({ ...errors, [name]: null })
    }
  }

  const handleChangeImage = (e) => {
    setData({ ...insData, url: e.target.files[0] })
  }

  const fileDelete = () => {
    setData({ ...insData, url: null })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errs = {}
    if (!insData.Name.trim()) errs.Name = "Name is required."
    if (!insData.Address.trim()) errs.Address = "Address is required."
    if (Object.keys(errs).length) { setErrors(errs); return }

    try {
      const payload = new FormData()
      payload.append("Name", insData.Name)
      payload.append("Address", insData.Address)
      payload.append("IsActive", insData.IsActive)
      payload.append("Url", insData.url)        

     const result =  createInstitution(payload);
     if(result){
        toast.success("Institute Created successfully !")
     }

      setSaved(true)
      setTimeout(() => setSaved(false), 3500)
    } catch (error) {
      console.error("Submit error:", error)
    }
  }

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ background: "linear-gradient(135deg, #e0c3fc 0%, #f9a8d4 50%, #a7f3d0 100%)" }}
    >
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Col xs={12} md={10} lg={8} xl={7}>

        {/* Top accent bar */}
        <div
          className="rounded-top"
          style={{ height: 5, background: "linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b)" }}
        />

        <Card className="shadow-lg border-0 rounded-top-0 rounded-bottom-4">

          {/* Header */}
          <Card.Header className="bg-white border-0 pt-4 pb-3 px-4">
            <Stack direction="horizontal" gap={3}>
              <div
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{ width: 52, height: 52, background: "linear-gradient(135deg,#7c3aed,#ec4899)" }}
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <rect x="3" y="6" width="20" height="16" rx="3" stroke="white" strokeWidth="1.8" />
                  <path d="M9 6V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" stroke="white" strokeWidth="1.8" />
                  <path d="M7.5 13h11M7.5 17h7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <Card.Title className="mb-0 fw-bold fs-5 text-dark">Institution</Card.Title>
                <Card.Subtitle className="text-muted" style={{ fontSize: 13 }}>
                  Register or update institution profile
                </Card.Subtitle>
              </div>
            </Stack>
          </Card.Header>

          <Card.Body className="px-4 pt-3 pb-2">
            <Form noValidate onSubmit={handleSubmit}>

              {/* Row 1: Name + Address */}
              <Row className="g-3 mb-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                      <Badge bg="primary" className="rounded-pill px-2" style={{ fontSize: 10 }}>Name</Badge>
                      <span className="text-dark">Institute Name <span className="text-danger">*</span></span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      value={insData.Name}
                      onChange={handleChange}
                      placeholder="e.g. Dhaka Medical College"
                      isInvalid={!!errors.Name}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                      <Badge bg="danger" className="rounded-pill px-2" style={{ fontSize: 10 }}>Addr</Badge>
                      <span className="text-dark">Address <span className="text-danger">*</span></span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="Address"
                      value={insData.Address}
                      onChange={handleChange}
                      placeholder="Street, City, Postal code"
                      isInvalid={!!errors.Address}
                      className="rounded-3"
                      style={{ resize: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">{errors.Address}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>


              <Row className="g-3 mb-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                      <Badge bg="warning" text="dark" className="rounded-pill px-2" style={{ fontSize: 10 }}>IMG</Badge>
                      <span className="text-dark">Image / Logo</span>
                    </Form.Label>

                    {!insData.url ? (
                      <Card
                        className="border-2 rounded-3 text-center bg-warning bg-opacity-10"
                        style={{ borderStyle: "dashed", borderColor: "#f59e0b", cursor: "pointer", minHeight: 100 }}
                        onClick={() => document.getElementById("imgInput").click()}
                      >
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center py-3">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-2">
                            <path d="M12 17V9M12 9l-3.5 3.5M12 9l3.5 3.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.5 18A4 4 0 0 0 8.5 21h7a4 4 0 0 0 4-3.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                          <p className="mb-0 text-warning fw-semibold" style={{ fontSize: 13 }}>Click to upload</p>
                          <p className="mb-0 text-muted" style={{ fontSize: 11 }}>PNG, JPG, WEBP</p>
                        </Card.Body>
                      </Card>
                    ) : (
                      <Card className="border-2 rounded-3 bg-warning bg-opacity-10" style={{ borderColor: "#f59e0b" }}>
                        <Card.Body className="py-2 px-3">
                          <Stack direction="horizontal" gap={3}>
                            <Image
                              src={URL.createObjectURL(insData.url)}
                              rounded
                              style={{ width: 48, height: 48, objectFit: "cover", border: "2px solid #f59e0b", flexShrink: 0 }}
                            />
                            <span className="text-truncate flex-grow-1 text-muted" style={{ fontSize: 13 }}>
                              {insData.url.name}
                            </span>
                            <Button variant="danger" size="sm" className="rounded-2" onClick={fileDelete}>
                              Remove
                            </Button>
                          </Stack>
                        </Card.Body>
                      </Card>
                    )}

                    <Form.Control
                      id="imgInput"
                      type="file"
                      accept="image/*"
                      className="d-none"
                      onChange={handleChangeImage}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                      <Badge bg="success" className="rounded-pill px-2" style={{ fontSize: 10 }}>Status</Badge>
                      <span className="text-dark">Active Status</span>
                    </Form.Label>
                    <Card
                      className={`border-2 rounded-3 ${insData.IsActive ? "border-success bg-success bg-opacity-10" : "border-secondary bg-light"}`}
                      style={{ cursor: "pointer", minHeight: 100 }}
                      onClick={() => setData({ ...insData, IsActive: !insData.IsActive })}
                    >
                      <Card.Body className="d-flex align-items-center justify-content-between px-3 py-3">
                        <Stack direction="horizontal" gap={3}>
                          <div
                            className={`d-flex align-items-center justify-content-center rounded-2 flex-shrink-0 ${insData.IsActive ? "bg-success" : "bg-secondary"}`}
                            style={{ width: 36, height: 36 }}
                          >
                            {insData.IsActive ? (
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9l4.5 4.5L15 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className={`fw-semibold ${insData.IsActive ? "text-success" : "text-secondary"}`} style={{ fontSize: 14 }}>
                              {insData.IsActive ? "Active" : "Inactive"}
                            </div>
                            <div className="text-muted" style={{ fontSize: 12 }}>
                              {insData.IsActive ? "Visible & operational" : "Hidden from listings"}
                            </div>
                          </div>
                        </Stack>
                        <Form.Check
                          type="switch"
                          name="IsActive"
                          checked={insData.IsActive}
                          onChange={handleChange}
                          onClick={(e) => e.stopPropagation()}
                          className="fs-5"
                        />
                      </Card.Body>
                    </Card>
                  </Form.Group>
                </Col>
              </Row>

            </Form>
          </Card.Body>

          {/* Footer */}
          <Card.Footer className="bg-white border-0 px-4 pb-4 pt-2">
            {saved && (
              <Alert variant="success" className="d-flex align-items-center gap-2 rounded-3 py-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" fill="#10b981" />
                  <path d="M5 9l3 3L13 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <strong>Saved successfully!</strong>
                  <span className="ms-2 text-muted" style={{ fontSize: 13 }}>Institution profile updated.</span>
                </div>
              </Alert>
            )}

            <Row className="g-2 justify-content-end">
              <Col xs="auto">
                <Button
                  variant="outline-secondary"
                  className="rounded-3 px-4"
                  style={{ height: 44 }}
                  onClick={() => {
                    setData({ Name: "", Address: "", url: null, IsActive: false })
                    setErrors({})
                    setSaved(false)
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  type="submit"
                  className="rounded-3 px-4 fw-bold border-0 d-flex align-items-center gap-2"
                  style={{
                    height: 44,
                    background: "linear-gradient(90deg,#7c3aed,#ec4899,#f59e0b)",
                    boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                  }}
                  onClick={handleSubmit}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4.5L6.5 11L3.5 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Save Institution
                </Button>
              </Col>
            </Row>
          </Card.Footer>

        </Card>
      </Col>
    </Container>
  )
}

export default Institution
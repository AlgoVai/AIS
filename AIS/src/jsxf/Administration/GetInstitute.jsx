import { useState, useEffect, useRef } from "react";
import {
  Container, Row, Col, Card, Table, Button,
  Form, Badge, Stack, InputGroup, Spinner,
  Modal, Image, OverlayTrigger, Tooltip
} from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000";

const SAMPLE = [
  { InstituteId: 1, Name: "Dhaka Medical College",  Url: null, Created_At: "2026-03-22T13:07:04.925319Z", Address: "Bakshibazar, Dhaka",   IsActive: true  },
  { InstituteId: 2, Name: "BUET Engineering",        Url: null, Created_At: "2026-03-20T09:30:00.000000Z", Address: "Polashi, Dhaka",       IsActive: true  },
  { InstituteId: 3, Name: "North South University",  Url: null, Created_At: "2026-03-18T11:00:00.000000Z", Address: "Bashundhara, Dhaka",   IsActive: false },
];

const AVATAR_COLORS = [
  { bg: "#eeedfe", color: "#534ab7" },
  { bg: "#e1f5ee", color: "#0f6e56" },
  { bg: "#fbeaf0", color: "#993556" },
  { bg: "#faeeda", color: "#854f0b" },
  { bg: "#e6f1fb", color: "#185fa5" },
];

function getAvatarStyle(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

function fmt(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ── Inline Form ──────────────────────────────────────────────────────────────
function InstituteForm({ initialData, onSuccess }) {
  const [form, setForm] = useState({
    Name:     initialData?.Name     ?? "",
    Address:  initialData?.Address  ?? "",
    IsActive: initialData?.IsActive ?? false,
    url:      null,
  });
  const [errors, setErrors]   = useState({});
  const [saving, setSaving]   = useState(false);
  const [preview, setPreview] = useState(
    initialData?.Url ? `${BASE_URL}${initialData.Url}` : null
  );

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors(er => ({ ...er, [name]: null }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({ ...f, url: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.Name.trim())    errs.Name    = "Name is required.";
    if (!form.Address.trim()) errs.Address = "Address is required.";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("Name",     form.Name);
      payload.append("Address",  form.Address);
      payload.append("IsActive", form.IsActive);
      if (form.url) payload.append("Url", form.url);

      const url    = initialData
        ? `${BASE_URL}/aiwgs/profile/Institute/${initialData.InstituteId}/`
        : `${BASE_URL}/aiwgs/profile/Institute/`;
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, { method, body: payload });
      if (!res.ok) throw new Error(`${res.status}`);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold text-muted" style={{ fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="Name" value={form.Name} onChange={handle}
              placeholder="e.g. Dhaka Medical College"
              isInvalid={!!errors.Name} className="rounded-3"
              style={{ fontSize: 14 }}
            />
            <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold text-muted" style={{ fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Address <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea" rows={2} name="Address" value={form.Address}
              onChange={handle} placeholder="Street, City, Country"
              isInvalid={!!errors.Address} className="rounded-3"
              style={{ resize: "none", fontSize: 14 }}
            />
            <Form.Control.Feedback type="invalid">{errors.Address}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold text-muted" style={{ fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Image / Logo
            </Form.Label>
            <Form.Control
              type="file" accept="image/*"
              onChange={handleFile} className="rounded-3"
              style={{ fontSize: 14 }}
            />
            {preview && (
              <div className="mt-2">
                <Image
                  src={preview} rounded
                  style={{ width: 56, height: 56, objectFit: "cover",
                    border: "2px solid #7c3aed", borderRadius: 10 }}
                />
              </div>
            )}
          </Form.Group>
        </Col>

        <Col xs={12} md={6} className="d-flex align-items-center">
          <Form.Group className="mt-3">
            <Form.Label className="fw-semibold text-muted d-block" style={{ fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Status
            </Form.Label>
            <Form.Check
              type="switch" name="IsActive" id="isActiveSwitch"
              label={
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {form.IsActive
                    ? <span style={{ color: "#0f6e56" }}>Active</span>
                    : <span style={{ color: "#993c1d" }}>Inactive</span>
                  }
                </span>
              }
              checked={form.IsActive}
              onChange={handle}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
        <Button
          variant="light"
          className="rounded-3 px-4 fw-semibold"
          style={{ fontSize: 14, height: 42 }}
          onClick={() => onSuccess && onSuccess()}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-3 px-4 fw-bold border-0 d-flex align-items-center gap-2"
          disabled={saving}
          style={{
            height: 42, fontSize: 14,
            background: "linear-gradient(90deg,#7c3aed,#ec4899)",
            boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
          }}
        >
          {saving ? (
            <><Spinner size="sm" />Saving…</>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M12.5 4L6 10.5L2.5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {initialData ? "Update institute" : "Save institute"}
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}

// ── Main Grid ────────────────────────────────────────────────────────────────
export default function InstituteGrid() {
  const [data, setData]           = useState(SAMPLE);
  const [search, setSearch]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem]   = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/aiwgs/profile/Institute/`);
      if (res.ok) setData(await res.json());
    } catch (_) {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = data.filter(r =>
    r.Name.toLowerCase().includes(search.toLowerCase()) ||
    r.Address.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd    = () => { setEditItem(null);  setShowModal(true); };
  const openEdit   = (item) => { setEditItem(item); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); fetchData(); };

  return (
    <Container
      fluid
      className="py-4 px-4"
      style={{
        minHeight: "100vh",
        background: "#f5f4f0",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* ── Page Header ── */}
      <Stack direction="horizontal" gap={3} className="mb-4">
        <div
          className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
          style={{
            width: 50, height: 50,
            background: "linear-gradient(135deg,#7c3aed,#ec4899)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="14" rx="3" stroke="white" strokeWidth="1.7"/>
            <path d="M8 6V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" stroke="white" strokeWidth="1.7"/>
            <path d="M7 11h10M7 15h6" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h5 className="mb-0 fw-bold text-dark">Institute management</h5>
          <p className="mb-0 text-muted" style={{ fontSize: 13 }}>
            Manage all registered institutions
          </p>
        </div>
      </Stack>

      {/* ── Main Card ── */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: 16, overflow: "hidden" }}>

        {/* Top accent */}
        <div style={{ height: 4, background: "linear-gradient(90deg,#7c3aed,#ec4899,#f59e0b)" }} />

        {/* Toolbar */}
        <Card.Body className="p-0">
          <div
            className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
            style={{ gap: 12 }}
          >
            {/* Left — Add button */}
            <Button
              className="d-flex align-items-center gap-2 fw-semibold border-0 rounded-3 flex-shrink-0"
              style={{
                height: 40,
                paddingInline: 20,
                fontSize: 13,
                background: "linear-gradient(90deg,#7c3aed,#ec4899)",
                boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
              }}
              onClick={openAdd}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5v11M1.5 7h11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add institute
            </Button>

            {/* Right — Search */}
            <InputGroup style={{ maxWidth: 280 }}>
              <InputGroup.Text
                className="border-end-0 bg-white"
                style={{ borderRadius: "10px 0 0 10px", borderColor: "#e5e7eb" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.2" stroke="#9ca3af" strokeWidth="1.4"/>
                  <path d="M9.5 9.5L12.5 12.5" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search institutes…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border-start-0 ps-0"
                style={{
                  borderRadius: "0 10px 10px 0",
                  fontSize: 13,
                  borderColor: "#e5e7eb",
                  height: 40,
                }}
              />
            </InputGroup>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: "#7c3aed" }} />
              <p className="mt-2 text-muted" style={{ fontSize: 13 }}>Loading institutes…</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle" style={{ fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#fafaf8" }}>
                    {["#", "Institution", "Address", "Created", "Status", "Action"].map(h => (
                      <th
                        key={h}
                        className="px-4 py-3 fw-semibold text-muted"
                        style={{
                          fontSize: 11, letterSpacing: "0.06em",
                          textTransform: "uppercase", whiteSpace: "nowrap",
                          borderBottom: "1px solid #f0ede6",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-5 text-muted">
                        No institutes found.
                      </td>
                    </tr>
                  ) : filtered.map((row, idx) => {
                    const av = getAvatarStyle(idx);
                    return (
                      <tr key={row.InstituteId}>

                        {/* # */}
                        <td className="px-4" style={{ width: 48, color: "#aaa", fontSize: 12 }}>
                          {String(idx + 1).padStart(2, "0")}
                        </td>

                        {/* Institution — logo + name */}
                        <td className="px-4" style={{ minWidth: 220 }}>
                          <div className="d-flex align-items-center gap-3">
                            {row.Url ? (
                              <img
                                src={`${BASE_URL}${row.Url}`}
                                alt={row.Name}
                                style={{
                                  width: 38, height: 38, borderRadius: 10,
                                  objectFit: "cover",
                                  border: "1.5px solid #e8e6e0",
                                  flexShrink: 0,
                                }}
                              />
                            ) : (
                              <div
                                className="d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                style={{
                                  width: 38, height: 38, borderRadius: 10,
                                  background: av.bg, color: av.color,
                                  fontSize: 15,
                                  border: "1.5px solid #e8e6e0",
                                }}
                              >
                                {row.Name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="fw-semibold text-dark" style={{ fontSize: 13 }}>
                                {row.Name}
                              </div>
                              <div className="text-muted" style={{ fontSize: 11 }}>
                                ID #{row.InstituteId}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Address */}
                        <td className="px-4 text-muted" style={{ fontSize: 13 }}>
                          {row.Address}
                        </td>

                        {/* Created */}
                        <td className="px-4 text-muted" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                          {fmt(row.Created_At)}
                        </td>

                        {/* Status */}
                        <td className="px-4">
                          <span
                            className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1 fw-semibold"
                            style={{
                              fontSize: 11,
                              background: row.IsActive ? "#e1f5ee" : "#faece7",
                              color:      row.IsActive ? "#0f6e56" : "#993c1d",
                            }}
                          >
                            <span style={{
                              width: 6, height: 6, borderRadius: "50%",
                              background: row.IsActive ? "#1d9e75" : "#d85a30",
                              display: "inline-block",
                            }} />
                            {row.IsActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* Action — edit icon + tooltip */}
                        <td className="px-4" style={{ textAlign: "center" }}>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`edit-${row.InstituteId}`}
                                style={{ fontSize: 11 }}>
                                Edit
                              </Tooltip>
                            }
                          >
                            <Button
                              variant="light"
                              className="d-inline-flex align-items-center justify-content-center p-0 border"
                              style={{
                                width: 34, height: 34, borderRadius: 8,
                                borderColor: "#e5e7eb",
                              }}
                              onClick={() => openEdit(row)}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path
                                  d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z"
                                  stroke="#6b7280"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Button>
                          </OverlayTrigger>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}

          {/* Footer count */}
          <div
            className="d-flex justify-content-end align-items-center px-4 py-3 border-top text-muted"
            style={{ fontSize: 12 }}
          >
            {filtered.length} institute{filtered.length !== 1 ? "s" : ""} total
          </div>
        </Card.Body>
      </Card>

      {/* ── Add / Edit Modal ── */}
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div style={{
          height: 4,
          background: "linear-gradient(90deg,#7c3aed,#ec4899,#f59e0b)",
          borderRadius: "8px 8px 0 0",
        }} />
        <Modal.Header closeButton className="border-0 pb-1 pt-4 px-4">
          <Modal.Title className="fw-bold" style={{ fontSize: 17 }}>
            {editItem ? "Edit institute" : "Add new institute"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pt-2 pb-4">
          <InstituteForm initialData={editItem} onSuccess={closeModal} />
        </Modal.Body>
      </Modal>

    </Container>
  );
}
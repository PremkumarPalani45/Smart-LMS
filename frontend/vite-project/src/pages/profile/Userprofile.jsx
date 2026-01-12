import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

       setUser({
  id: res.data.id,
  name: res.data.name,
  email: res.data.email,
  avatar: res.data.avatar || ""
});
        setForm({
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        toast.error("Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //update avatar
  const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const res = await axios.put(
      `${backendUrl}/api/user/avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setUser(prev => ({
  ...prev,
  avatar: res.data.avatar
}));
    toast.success("Avatar updated ✅");
  } catch (err) {
    toast.error("Avatar upload failed ❌");
  }
};

  // 🔹 Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(
        `${backendUrl}/api/user/profile`,
        {
          name: form.name,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEditingField(null);
      toast.success("Profile updated successfully ✅");
    } catch (err) {
      toast.error("Failed to update profile ❌");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">

              <h4 className="mb-4 text-center">My Profile</h4>
            

            {/* avatar for profile */}
           <div className="text-center mb-4">
  <img
    src={
      user.avatar || "https://ui-avatars.com/api/?name=User"
    }
    alt="Avatar"
    className="rounded-circle mb-2"
    width="120"
    height="120"
    style={{ objectFit: "cover" }}
    onError={(e) => {
      e.target.src = "https://ui-avatars.com/api/?name=User";
    }}
  />

  <div>
    <label className="btn btn-sm btn-outline-primary">
      Change Avatar
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleAvatarUpload}
      />
    </label>
  </div>
</div>


              <form onSubmit={handleSubmit}>

                {/* USER ID */}
                <div className="mb-3">
                  <label className="form-label small text-muted">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.id}
                    disabled
                  />
                </div>

                {/* NAME */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      disabled={editingField !== "name"}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setEditingField(
                          editingField === "name" ? null : "name"
                        )
                      }
                    >
                      {editingField === "name" ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                  <label className="form-label">Email Address</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      disabled={editingField !== "email"}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setEditingField(
                          editingField === "email" ? null : "email"
                        )
                      }
                    >
                      {editingField === "email" ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </div>

                {/* UPDATE BUTTON */}
                {editingField && (
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-lg"
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? "Updating..." : "Update"}
                    </button>
                  </div>
                )}

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

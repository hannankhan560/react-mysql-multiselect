import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export default function ColorForm() {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      colors: [],
    },
  });

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/colors`);
      const data = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(data);
    } catch (err) {
      console.error("Error loading colors", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const ids = data.colors.map((c) => c.value);
      await axios.post(`${API_URL}/save`, { selectedColors: ids });
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save!");
    }
  };

  const handleClear = async () => {
    reset({ colors: [] });
    try {
      const res = await axios.get(`${API_URL}/saved`);
      const savedIds = res.data.selected_colors?.split(",").map(Number) || [];
      const selected = options.filter((opt) => savedIds.includes(opt.value));
      setValue("colors", selected);
      alert("🔁 Reloaded saved colors!");
    } catch (err) {
      console.error("Error reloading saved data", err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>🎨 Select Colors (React Hook Form + React Select)</h2>

      <button onClick={handleLoad} disabled={loading}>
        {loading ? "Loading..." : "Load Colors"}
      </button>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
        <Controller
          name="colors"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={options}
              placeholder="Select colors..."
            />
          )}
        />

        <div style={{ marginTop: "20px" }}>
          <button type="submit">💾 Save</button>
          <button type="button" onClick={handleClear} style={{ marginLeft: "10px" }}>
            🔄 Clear & Reload
          </button>
        </div>
      </form>
    </div>
  );
}

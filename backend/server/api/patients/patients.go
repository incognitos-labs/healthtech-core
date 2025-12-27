package patients

import (
	"encoding/json"
	"net/http"
	"time"
)

type Patients struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	Phone        string    `json:"phone"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	IsActive     bool      `json:"is_active"`
	LastActivity time.Time `json:"last_activity"`
}

func Getpatients(w http.ResponseWriter, r *http.Request) {
	// CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	patients := []Patients{
		{
			ID:           "01",
			Name:         "John Doe",
			Email:        "john.doe@example.com",
			Phone:        "1234567890",
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
			IsActive:     true,
			LastActivity: time.Now(),
		},
		{
			ID:           "02",
			Name:         "Jane Doe",
			Email:        "jane.doe@example.com",
			Phone:        "1234567890",
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
			IsActive:     true,
			LastActivity: time.Now(),
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(patients)

}

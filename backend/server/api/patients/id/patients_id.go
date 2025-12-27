package patientsid

import (
	"encoding/json"
	"net/http"
	"time"
)

type PatientByID struct {
	ID            string    `json:"id"`
	Name          string    `json:"name"`
	Firstname     string    `json:"firstname"`
	Lastname      string    `json:"lastname"`
	Email         string    `json:"email"`
	Phone         string    `json:"phone"`
	Address       string    `json:"address"`
	City          string    `json:"city"`
	State         string    `json:"state"`
	Zip           string    `json:"zip"`
	Country       string    `json:"country"`
	DateOfBirth   time.Time `json:"date_of_birth"`
	Gender        string    `json:"gender"`
	MaritalStatus string    `json:"marital_status"`
	Occupation    string    `json:"occupation"`
	Religion      string    `json:"religion"`
	Nationality   string    `json:"nationality"`
	Language      string    `json:"language"`
	BloodType     string    `json:"blood_type"`
	Height        int       `json:"height"`
	Weight        int       `json:"weight"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	IsActive      bool      `json:"is_active"`
	LastActivity  time.Time `json:"last_activity"`
}

func GetPatientById(w http.ResponseWriter, r *http.Request) {
	// CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	patientbyid := []PatientByID{
		{
			ID:            "01",
			Name:          "John Doe",
			Email:         "john.doe@example.com",
			Phone:         "1234567890",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
			IsActive:      true,
			LastActivity:  time.Now(),
			Firstname:     "John",
			Lastname:      "Doe",
			DateOfBirth:   time.Now(),
			Gender:        "Male",
			MaritalStatus: "Single",
			Occupation:    "Software Engineer",
			Religion:      "Christian",
			Nationality:   "American",
			Language:      "English",
			BloodType:     "A+",
			Height:        180,
			Weight:        70,
			Address:       "123 Main St, Anytown, USA",
			City:          "Anytown",
			State:         "CA",
			Zip:           "12345",
			Country:       "USA",
		},

		{
			ID:            "02",
			Name:          "Jane Doe",
			Email:         "jane.doe@example.com",
			Phone:         "1234567890",
			CreatedAt:     time.Now(),
			UpdatedAt:     time.Now(),
			IsActive:      true,
			LastActivity:  time.Now(),
			Firstname:     "Jane",
			Lastname:      "Doe",
			DateOfBirth:   time.Now(),
			Gender:        "Female",
			MaritalStatus: "Single",
			Occupation:    "Software Engineer",
			Religion:      "Christian",
			Nationality:   "American",
			Language:      "English",
			BloodType:     "A+",
			Height:        180,
			Weight:        70,
			Address:       "123 Main St, Anytown, USA",
			City:          "Anytown",
			State:         "CA",
			Zip:           "12345",
			Country:       "USA",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(patientbyid)

}

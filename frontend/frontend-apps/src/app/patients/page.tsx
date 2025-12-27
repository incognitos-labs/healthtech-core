'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/status-badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination } from '@/components/ui/pagination';

type Patients = {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    last_activity: string;
    diagnosis?: string;
    status?: 'new' | 'active' | 'non-active';
}

function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date).replace(/\//g, '/');
    } catch {
        return 'N/A';
    }
}

function getStatusFromPatient(patient: Patients): 'new' | 'active' | 'non-active' {
    if (patient.status === 'new') return 'new';
    if (patient.is_active || patient.status === 'active') return 'active';
    return 'non-active';
}

export default function PatientsListPage() {
    const [patientsList, setPatientsList] = useState<Patients[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [selectedPatients, setSelectedPatients] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchPatients() {
            try {
                const res = await fetch("http://localhost:8080/api/patients", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setPatientsList(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
                // Set empty array on error so UI still renders
                setPatientsList([]);
            } finally {
                setLoading(false);
            }
        }

        fetchPatients();
    }, []);

    const filteredPatients = patientsList.filter(patient => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            patient.name.toLowerCase().includes(query) ||
            patient.id.toLowerCase().includes(query) ||
            `P-${patient.id.padStart(5, '0')}`.toLowerCase().includes(query)
        );
    });

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedPatients = filteredPatients.slice(startIndex, endIndex);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedPatients(new Set(displayedPatients.map(p => p.id)));
        } else {
            setSelectedPatients(new Set());
        }
    };

    const handleSelectPatient = (patientId: string, checked: boolean) => {
        const newSelected = new Set(selectedPatients);
        if (checked) {
            newSelected.add(patientId);
        } else {
            newSelected.delete(patientId);
        }
        setSelectedPatients(newSelected);
    };

    const isAllSelected = displayedPatients.length > 0 && displayedPatients.every(p => selectedPatients.has(p.id));

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--obsidian-black)' }}>
                <div className="text-[var(--ice-white)]">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--obsidian-black)' }}>
            <div className="w-full max-w-full px-8 py-8">
                {/* Header with Title and Add Button */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-[var(--ice-white)] leading-tight">
                        Patients
                    </h1>
                    <Button>
                        + Add patient
                    </Button>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center gap-3 mb-6">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                    </Button>
                    <Input
                        type="text"
                        placeholder="Search by name or #id"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--cool-gray)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                        className="flex-1"
                    />
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        <TableHeaderCell style={{ width: '50px', minWidth: '50px' }}>
                            <Checkbox
                                checked={isAllSelected}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                            />
                        </TableHeaderCell>
                        <TableHeaderCell style={{ width: '220px', minWidth: '220px' }}>NAME</TableHeaderCell>
                        <TableHeaderCell style={{ width: '110px', minWidth: '110px' }}>#ID</TableHeaderCell>
                        <TableHeaderCell style={{ width: '130px', minWidth: '130px' }}>STATUS</TableHeaderCell>
                        <TableHeaderCell style={{ width: '150px', minWidth: '150px' }}>LAST VISIT</TableHeaderCell>
                        <TableHeaderCell style={{ width: '160px', minWidth: '160px' }}>DIAGNOSIS</TableHeaderCell>
                        <TableHeaderCell style={{ width: '110px', minWidth: '110px' }}>PROFILE</TableHeaderCell>
                        <TableHeaderCell style={{ width: '50px', minWidth: '50px' }}><span className="sr-only">Actions</span></TableHeaderCell>
                    </TableHeader>
                    <TableBody>
                        {displayedPatients.map((patient) => {
                            const status = getStatusFromPatient(patient);
                            return (
                                <TableRow key={patient.id}>
                                    <TableCell style={{ width: '50px', minWidth: '50px' }}>
                                        <Checkbox
                                            checked={selectedPatients.has(patient.id)}
                                            onChange={(e) => handleSelectPatient(patient.id, e.target.checked)}
                                        />
                                    </TableCell>
                                    <TableCell style={{ width: '220px', minWidth: '220px' }}>
                                        <div className="flex items-center gap-3">
                                            <Avatar name={patient.name} />
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-[var(--ice-white)] text-sm leading-tight truncate">
                                                    {patient.name}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: '110px', minWidth: '110px' }}>
                                        <span className="text-[var(--ice-white)] text-sm">
                                            P-{patient.id.padStart(5, '0')}
                                        </span>
                                    </TableCell>
                                    <TableCell style={{ width: '130px', minWidth: '130px' }}>
                                        <StatusBadge status={status} />
                                    </TableCell>
                                    <TableCell style={{ width: '150px', minWidth: '150px' }}>
                                        <div>
                                            <div className="text-sm text-[var(--ice-white)] leading-tight">
                                                {formatDate(patient.last_activity)}
                                            </div>
                                            <button
                                                className="text-xs mt-0.5 hover:underline text-[var(--cyber-teal)] leading-tight block"
                                            >
                                                Notes
                                            </button>
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: '160px', minWidth: '160px' }}>
                                        <span className="text-sm text-[var(--ice-white)]">
                                            {patient.diagnosis || 'N/A'}
                                        </span>
                                    </TableCell>
                                    <TableCell style={{ width: '110px', minWidth: '110px' }}>
                                        <button
                                            className="text-sm hover:underline text-[var(--cyber-teal)]"
                                        >
                                            Profile
                                        </button>
                                    </TableCell>
                                    <TableCell style={{ width: '50px', minWidth: '50px' }}>
                                        <button
                                            className="p-1 rounded hover:bg-[rgba(148,163,184,0.1)] transition-all text-[var(--cool-gray)]"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {/* Bulk Actions Bar */}
                {selectedPatients.size > 0 && (
                    <div className="mt-5 flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--cyber-teal)]">
                        <span className="text-sm font-medium text-[var(--obsidian-black)]">
                            {selectedPatients.size} SELECTED
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded hover:bg-[rgba(10,14,20,0.2)] text-[var(--obsidian-black)]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </button>
                            <button className="p-2 rounded hover:bg-[rgba(10,14,20,0.2)] text-[var(--obsidian-black)]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                            <button className="p-2 rounded hover:bg-[rgba(10,14,20,0.2)] text-[var(--obsidian-black)]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        <label className="flex items-center gap-2 text-sm cursor-pointer text-[var(--obsidian-black)] ml-auto">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded accent-[var(--obsidian-black)]"
                            />
                            Show only selected
                        </label>
                    </div>
                )}

                {/* Pagination */}
                {filteredPatients.length > 0 && (
                    <div className="mt-5">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            totalItems={filteredPatients.length}
                            onPageChange={setCurrentPage}
                            onItemsPerPageChange={(items) => {
                                setItemsPerPage(items);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                )}

                {/* Empty State */}
                {filteredPatients.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🏥</div>
                        <h3 className="text-2xl font-semibold mb-2 text-[var(--ice-white)]">
                            {searchQuery ? 'No patients found' : 'No patients found'}
                        </h3>
                        <p className="text-[var(--cool-gray)]">
                            {searchQuery
                                ? 'Try adjusting your search criteria.'
                                : 'Start by adding your first patient record.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, User, Settings } from "lucide-react"

// Mock data
const employees = [
  {
    id: 1,
    name: "Jonas Petraitis",
    email: "jonas.petraitis@kesko.lt",
    position: "Sandėlio darbuotojas",
    department: "Kaunas",
    joinDate: "2023-06-15",
    lastLogin: "2024-01-15 14:30",
    permissions: ["Paėmimo darbuotojai", "Pakavimo darbuotojai"],
    customPermissions: [],
  },
  {
    id: 2,
    name: "Marija Kazlauskienė",
    email: "marija.kazlauskiene@kesko.lt",
    position: "Vadybininkė",
    department: "Vilnius",
    joinDate: "2022-03-10",
    lastLogin: "2024-01-14 16:45",
    permissions: ["Administratoriai", "Vadybininkai"],
    customPermissions: [],
  },
  {
    id: 3,
    name: "Petras Jonaitis",
    email: "petras.jonaitis@kesko.lt",
    position: "Sandėlio darbuotojas",
    department: "Kaunas",
    joinDate: "2023-08-20",
    lastLogin: "2024-01-15 09:15",
    permissions: ["Paėmimo darbuotojai"],
    customPermissions: [],
  },
  {
    id: 4,
    name: "Rūta Stankevičienė",
    email: "ruta.stankeviciene@kesko.lt",
    position: "Kasininkas",
    department: "Klaipėda",
    joinDate: "2023-01-12",
    lastLogin: "2024-01-15 11:20",
    permissions: ["Pakavimo darbuotojai", "Klientų aptarnavimas"],
    customPermissions: [],
  },
  {
    id: 5,
    name: "Andrius Vasiliauskas",
    email: "andrius.vasiliauskas@kesko.lt",
    position: "IT specialistas",
    department: "Vilnius",
    joinDate: "2021-11-05",
    lastLogin: "2024-01-15 13:10",
    permissions: ["Administratoriai"],
    customPermissions: ["sistemos nustatymai", "techninė pagalba"],
  },
  {
    id: 6,
    name: "Gintarė Paulauskienė",
    email: "gintare.paulauskiene@kesko.lt",
    position: "Sandėlio darbuotojas",
    department: "Kaunas",
    joinDate: "2023-03-22",
    lastLogin: "2024-01-15 10:45",
    permissions: ["Paėmimo darbuotojai", "Pakavimo darbuotojai"],
    customPermissions: [],
  },
]

const permissionGroups = [
  {
    id: "paemimo",
    name: "Paėmimo darbuotojai",
    description: "Prieiga prie paėmimo operacijų ir atsargų valdymo",
    permissions: ["peržiūrėti atsargas", "kurti paėmimo užsakymus", "atnaujinti atsargų vietas"],
    editable: true,
  },
  {
    id: "pakavimo",
    name: "Pakavimo darbuotojai",
    description: "Prieiga prie pakavimo operacijų ir siuntų paruošimo",
    permissions: ["peržiūrėti užsakymus", "kurti siuntas", "spausdinti etiketes"],
    editable: true,
  },
  {
    id: "administratoriai",
    name: "Administratoriai",
    description: "Pilna administracinė prieiga prie visų sistemos funkcijų",
    permissions: ["valdyti vartotojus", "sistemos nustatymai", "peržiūrėti ataskaitas", "audito žurnalai"],
    editable: true,
  },
  {
    id: "klientu-aptarnavimas",
    name: "Klientų aptarnavimas",
    description: "Prieiga prie klientų aptarnavimo funkcijų ir užsakymų valdymo",
    permissions: ["peržiūrėti užsakymus", "valdyti grąžinimus", "klientų duomenys", "komunikacija"],
    editable: true,
  },
  {
    id: "vadybininkai",
    name: "Vadybininkai",
    description: "Vadybinė prieiga prie ataskaitų ir analitikos",
    permissions: ["peržiūrėti ataskaitas", "analitika", "darbuotojų valdymas", "biudžeto kontrolė"],
    editable: true,
  },
  {
    id: "it-palaikymas",
    name: "IT palaikymas",
    description: "Techninė prieiga prie sistemos palaikymo ir konfigūracijos",
    permissions: ["sistemos nustatymai", "techninė pagalba", "duomenų bazės", "saugumas"],
    editable: true,
  },
]

const allPermissions = [
  "peržiūrėti atsargas",
  "kurti paėmimo užsakymus",
  "atnaujinti atsargų vietas",
  "peržiūrėti užsakymus",
  "kurti siuntas",
  "spausdinti etiketes",
  "valdyti vartotojus",
  "sistemos nustatymai",
  "peržiūrėti ataskaitas",
  "audito žurnalai",
  "valdyti grąžinimus",
  "klientų duomenys",
  "komunikacija",
  "analitika",
  "darbuotojų valdymas",
  "biudžeto kontrolė",
  "techninė pagalba",
  "duomenų bazės",
  "saugumas",
]

const departments = {
  LT: ["Kaunas", "Vilnius", "Klaipėda", "Šiauliai", "Panevėžys"],
  LV: ["Ryga", "Daugpilis", "Liepoja", "Jelgava"],
  EE: ["Talinas", "Tartu", "Narva", "Pärnu"],
}

const positions = [
  "Kasininkas",
  "Sandėlio darbuotojas",
  "Vadybininkas",
  "IT specialistas",
  "Klientų aptarnavimo specialistas",
]

export default function EmployeeManagement() {
  const [selectedEmployee, setSelectedEmployee] = useState<(typeof employees)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("Visi padaliniai")
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const [isCustomPermissionsOpen, setIsCustomPermissionsOpen] = useState(false)
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false)
  const [isBulkUpdateOpen, setIsBulkUpdateOpen] = useState(false)
  const [isBulkCustomPermissionsOpen, setIsBulkCustomPermissionsOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<(typeof permissionGroups)[0] | null>(null)
  const [customPermissions, setCustomPermissions] = useState<string[]>([])
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    permissionGroup: "",
    department: "",
    country: "LT",
    position: "",
  })
  const [bulkUpdate, setBulkUpdate] = useState({
    position: "",
    permissionGroups: [] as string[],
    customPermissions: [] as string[],
  })

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "Visi padaliniai" || employee.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (!selectedEmployee) return
    console.log(`${checked ? "Adding" : "Removing"} permission ${permissionId} for employee ${selectedEmployee.id}`)
  }

  const handleCustomPermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setCustomPermissions([...customPermissions, permission])
    } else {
      setCustomPermissions(customPermissions.filter((p) => p !== permission))
    }
  }

  const handleAddEmployee = () => {
    console.log("Adding new employee:", newEmployee)
    setIsAddEmployeeOpen(false)
    setNewEmployee({
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      permissionGroup: "",
      department: "",
      country: "LT",
      position: "",
    })
  }

  const handleBulkUpdate = () => {
    console.log("Bulk updating positions:", bulkUpdate)
    setIsBulkUpdateOpen(false)
    setBulkUpdate({
      position: "",
      permissionGroups: [],
      customPermissions: [],
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="60" height="26" viewBox="0 0 154.483 67.846" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clip-path">
                  <rect width="154.483" height="67.846" fill="none" />
                </clipPath>
              </defs>
              <g clipPath="url(#clip-path)">
                <path
                  d="M384.94,56.483,380.7,63.015h2.226a4.478,4.478,0,0,1,0,8.956h-8.041l-4.362,6.717h12.4a11.194,11.194,0,0,0,2.016-22.2"
                  transform="translate(-266.501 -40.626)"
                  fill="#ffb81c"
                />
                <path
                  d="M454.1,0h-6.717l-4.362,6.717H454.1a12.314,12.314,0,1,1,0,24.628h-4.594l-4.362,6.717H454.1A19.031,19.031,0,1,0,454.1,0"
                  transform="translate(-318.652)"
                  fill="#ffb81c"
                />
                <path
                  d="M294.949,6.717,299.311,0H288.206l-4.362,6.717Z"
                  transform="translate(-204.158 0)"
                  fill="#d50032"
                />
                <path
                  d="M246.04,67.019a11.2,11.2,0,0,0-11.194-11.194h-8.969l-4.242,6.532a11.226,11.226,0,0,0,2.016.185h11.194a4.478,4.478,0,0,1,0,8.956H215.7l-4.362,6.717h23.508A11.2,11.2,0,0,0,246.04,67.019"
                  transform="translate(-152.007 -40.153)"
                  fill="#d50032"
                />
                <path
                  d="M335.325,111.65l-4.362,6.717h11.105l4.362-6.717Z"
                  transform="translate(-238.049 -80.306)"
                  fill="#d50032"
                />
                <path
                  d="M334.95,11.194a11.2,11.2,0,0,0,11.194,11.194h8.969l4.242-6.532a11.226,11.226,0,0,0-2.016-.185H346.144a4.478,4.478,0,0,1,0-8.956h19.147L369.653,0H346.144A11.2,11.2,0,0,0,334.95,11.194"
                  transform="translate(-240.917)"
                  fill="#d50032"
                />
                <path
                  d="M36.519,175.592H29.8a2.239,2.239,0,1,1,0-4.478h11.81v-3.638H29.8a5.877,5.877,0,1,0,0,11.754h6.717a2.379,2.379,0,0,1,0,4.758H24.2v3.638H36.519a6.017,6.017,0,0,0,0-12.034"
                  transform="translate(-17.208 -120.459)"
                  fill="#101820"
                />
                <path
                  d="M200.545,186.994a2.927,2.927,0,0,1-2.4-1.252l-9.526-13.57-.69-1.04v15.456h-3.638V168.975a2.939,2.939,0,0,1,5.344-1.688l9.526,13.57.69,1.04V166.439h3.638v17.615a2.927,2.927,0,0,1-2.053,2.8,2.958,2.958,0,0,1-.892.138"
                  transform="translate(-132.554 -119.423)"
                  fill="#101820"
                />
                <path
                  d="M109.16,183.987v-4.758h12.706v-3.638H109.16v-4.478h13.265v-3.638H108.992a3.638,3.638,0,0,0-3.638,3.638v12.874a3.638,3.638,0,0,0,3.638,3.638h13.769v-3.638Z"
                  transform="translate(-75.777 -120.458)"
                  fill="#101820"
                />
                <rect width="3.806" height="20.15" transform="translate(143.96 47.017)" fill="#101820" />
                <path
                  d="M372.77,167.476h-4.482l-4.879,8h-4.846v-8h-3.806v20.15h3.806v-8.508h4.727l5.551,8.508h4.7l-7-10.327Z"
                  transform="translate(-255.163 -120.459)"
                  fill="#101820"
                />
                <path
                  d="M437.545,166.034a2.931,2.931,0,0,0-2.712,1.807l-7.82,18.747h4.054l1.9-4.87h9.164l1.9,4.87h4.054l-7.82-18.747a2.931,2.931,0,0,0-2.712-1.807m-3.124,12.047,3.124-7.907,3.124,7.907Z"
                  transform="translate(-307.134 -119.422)"
                  fill="#101820"
                />
                <path
                  d="M285.572,167.476v12.138c0,3.92-2.313,5.079-5.373,5.079s-5.373-1.159-5.373-5.079V167.476h-3.806v12.138c0,6.193,4.017,8.691,9.18,8.691s9.18-2.5,9.18-8.691V167.476Z"
                  transform="translate(-194.934 -120.459)"
                  fill="#101820"
                />
                <path
                  d="M49.255,15.672H38.061a4.478,4.478,0,0,1,0-8.956H57.207L61.569,0H38.061a11.194,11.194,0,0,0,0,22.389H49.255a4.478,4.478,0,0,1,0,8.956H19.03a12.314,12.314,0,0,1,0-24.628h4.594L27.986,0H19.03a19.031,19.031,0,0,0,0,38.061H49.255a11.194,11.194,0,1,0,0-22.389"
                  fill="#101820"
                />
                <path
                  d="M224.5,22.205l4.242-6.532h-2.226a4.478,4.478,0,0,1,0-8.956h8.041L238.923,0h-12.4a11.194,11.194,0,0,0-2.016,22.2"
                  transform="translate(-154.875 -0.001)"
                  fill="#101820"
                />
              </g>
            </svg>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Kesko Senukai Lietuva</h1>
              <p className="text-xs text-gray-600">Darbuotojų užduočių valdymas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Jusmart</span>
            <Button variant="outline" size="sm" className="text-xs h-7">
              Atsijungti
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Navigacija</h3>
            <nav className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm h-10 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Pagrindinis
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Užduotys
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                Kroviniai
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Atsargos
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                Užsakymai
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                Siuntimas
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Ataskaitos
              </Button>
              <Button className="w-full justify-start gap-3 text-sm h-10 bg-yellow-400 text-black hover:bg-yellow-500 font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Valdymas
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Darbuotojų teisių valdymas</h2>
              <p className="text-sm text-gray-600">Valdykite darbuotojų prieigos teises ir teisių grupes</p>
            </div>

            <Tabs defaultValue="darbuotojai" className="space-y-4">
              <TabsList className="h-10">
                <TabsTrigger
                  value="darbuotojai"
                  className="text-sm border-b-2 border-yellow-400 data-[state=active]:border-yellow-400"
                >
                  Darbuotojai
                </TabsTrigger>
                <TabsTrigger value="teisiu-grupes" className="text-sm">
                  Teisių grupės
                </TabsTrigger>
              </TabsList>

              <TabsContent value="darbuotojai" className="space-y-4">
                <div className="flex gap-4 h-[calc(100vh-220px)]">
                  {/* Left Panel - Employee List */}
                  <div className="w-1/2 space-y-3">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-base">
                            
                          </CardTitle>
                          <div className="flex gap-2">
                            <Dialog open={isBulkUpdateOpen} onOpenChange={setIsBulkUpdateOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="h-8 text-xs">
                                  <Settings className="w-3 h-3 mr-1" />
                                  Atnaujinti pareigybės grupes
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle className="text-base">Atnaujinti pareigybės grupes</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label className="text-sm">Pasirinkti pareigybę</Label>
                                    <Select
                                      value={bulkUpdate.position}
                                      onValueChange={(value) => setBulkUpdate({ ...bulkUpdate, position: value })}
                                    >
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue placeholder="Pasirinkite pareigybę" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {positions.map((position) => (
                                          <SelectItem key={position} value={position} className="text-sm">
                                            {position}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-sm">Teisių grupės</Label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                      {permissionGroups.map((group) => (
                                        <div key={group.id} className="flex items-center space-x-2">
                                          <Checkbox
                                            id={`bulk-${group.id}`}
                                            checked={bulkUpdate.permissionGroups.includes(group.id)}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                setBulkUpdate({
                                                  ...bulkUpdate,
                                                  permissionGroups: [...bulkUpdate.permissionGroups, group.id],
                                                })
                                              } else {
                                                setBulkUpdate({
                                                  ...bulkUpdate,
                                                  permissionGroups: bulkUpdate.permissionGroups.filter(
                                                    (id) => id !== group.id,
                                                  ),
                                                })
                                              }
                                            }}
                                          />
                                          <Label htmlFor={`bulk-${group.id}`} className="text-sm">
                                            {group.name}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id="bulk-custom-permissions"
                                        checked={bulkUpdate.customPermissions.length > 0}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            setIsBulkCustomPermissionsOpen(true)
                                          } else {
                                            setBulkUpdate({ ...bulkUpdate, customPermissions: [] })
                                          }
                                        }}
                                      />
                                      <Label htmlFor="bulk-custom-permissions" className="text-sm">
                                        Custom teisės
                                      </Label>
                                    </div>
                                    {bulkUpdate.customPermissions.length > 0 && (
                                      <div className="ml-6 text-xs text-gray-600">
                                        Pasirinkta: {bulkUpdate.customPermissions.length} teisių
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex justify-end gap-2 pt-4 border-t">
                                    <Button
                                      variant="outline"
                                      onClick={() => setIsBulkUpdateOpen(false)}
                                      className="h-8 text-sm"
                                    >
                                      Atšaukti
                                    </Button>
                                    <Button
                                      onClick={handleBulkUpdate}
                                      className="bg-yellow-400 text-black hover:bg-yellow-500 h-8 text-sm"
                                    >
                                      Atnaujinti
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
                              <DialogTrigger asChild>
                                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 h-8 text-sm">
                                  <Plus className="w-3 h-3 mr-1" />
                                  Pridėti darbuotoją
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="text-base">Pridėti naują darbuotoją</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3 py-4">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <Label htmlFor="firstName" className="text-sm">
                                        Vardas *
                                      </Label>
                                      <Input
                                        id="firstName"
                                        value={newEmployee.firstName}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                                        placeholder="Vardas"
                                        className="h-8 text-sm"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label htmlFor="lastName" className="text-sm">
                                        Pavardė *
                                      </Label>
                                      <Input
                                        id="lastName"
                                        value={newEmployee.lastName}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                                        placeholder="Pavardė"
                                        className="h-8 text-sm"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <Label className="text-sm">Šalis</Label>
                                    <div className="flex gap-4">
                                      {Object.keys(departments).map((country) => (
                                        <div key={country} className="flex items-center space-x-2">
                                          <Checkbox
                                            id={country}
                                            checked={newEmployee.country === country}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                setNewEmployee({ ...newEmployee, country, department: "" })
                                              }
                                            }}
                                          />
                                          <Label htmlFor={country} className="text-sm">
                                            {country}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <Label className="text-sm">Padalinys *</Label>
                                    <Select
                                      value={newEmployee.department}
                                      onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}
                                    >
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue placeholder="Pasirinkite padalinį" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {departments[newEmployee.country as keyof typeof departments]?.map((dept) => (
                                          <SelectItem key={dept} value={dept} className="text-sm">
                                            {dept}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-1">
                                    <Label className="text-sm">Pareigos</Label>
                                    <Select
                                      value={newEmployee.position}
                                      onValueChange={(value) => setNewEmployee({ ...newEmployee, position: value })}
                                    >
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue placeholder="Pasirinkite pareigas" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {positions.map((position) => (
                                          <SelectItem key={position} value={position} className="text-sm">
                                            {position}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-1">
                                    <Label htmlFor="login" className="text-sm">
                                      Login *
                                    </Label>
                                    <Input
                                      id="login"
                                      value={newEmployee.login}
                                      onChange={(e) => setNewEmployee({ ...newEmployee, login: e.target.value })}
                                      placeholder="Prisijungimo vardas"
                                      className="h-8 text-sm"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <Label htmlFor="password" className="text-sm">
                                      Slaptažodis *
                                    </Label>
                                    <Input
                                      id="password"
                                      type="password"
                                      value={newEmployee.password}
                                      onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                                      placeholder="Slaptažodis"
                                      className="h-8 text-sm"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <Label className="text-sm">Teisių grupė</Label>
                                    <Select
                                      value={newEmployee.permissionGroup}
                                      onValueChange={(value) => {
                                        if (value === "custom") {
                                          setIsCustomPermissionsOpen(true)
                                        } else {
                                          setNewEmployee({ ...newEmployee, permissionGroup: value })
                                        }
                                      }}
                                    >
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue placeholder="Pasirinkite teisių grupę" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {permissionGroups.map((group) => (
                                          <SelectItem key={group.id} value={group.id} className="text-sm">
                                            {group.name}
                                          </SelectItem>
                                        ))}
                                        <SelectItem value="custom" className="text-sm">
                                          Custom teisių grupė
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="flex justify-end gap-2 pt-4 border-t">
                                    <Button
                                      variant="outline"
                                      onClick={() => setIsAddEmployeeOpen(false)}
                                      className="h-8 text-sm"
                                    >
                                      Atšaukti
                                    </Button>
                                    <Button
                                      onClick={handleAddEmployee}
                                      className="bg-yellow-400 text-black hover:bg-yellow-500 h-8 text-sm"
                                    >
                                      Pridėti darbuotoją
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 p-4">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              placeholder="Ieškoti darbuotojų pagal vardą, pavardę arba login..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-8 h-8 text-sm"
                            />
                          </div>
                          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                            <SelectTrigger className="w-40 h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Visi padaliniai" className="text-sm">
                                Visi padaliniai
                              </SelectItem>
                              <SelectItem value="Kaunas" className="text-sm">
                                Kaunas
                              </SelectItem>
                              <SelectItem value="Vilnius" className="text-sm">
                                Vilnius
                              </SelectItem>
                              <SelectItem value="Klaipėda" className="text-sm">
                                Klaipėda
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="text-sm text-gray-600">
                          Rasta darbuotojų: {filteredEmployees.length} iš {employees.length}
                        </div>

                        <div className="space-y-1 max-h-[calc(100vh-400px)] overflow-y-auto">
                          {filteredEmployees.map((employee) => (
                            <div
                              key={employee.id}
                              className={`p-3 border rounded cursor-pointer transition-colors ${
                                selectedEmployee?.id === employee.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                              onClick={() => setSelectedEmployee(employee)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900">{employee.name}</h4>
                                  <p className="text-sm text-gray-600">{employee.email}</p>
                                  <p className="text-sm text-gray-500">{employee.position}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">{employee.department}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Panel - Employee Details & Permissions */}
                  <div className="w-1/2">
                    {selectedEmployee ? (
                      <Card className="h-full">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Darbuotojo teisių valdymas</CardTitle>
                          <p className="text-sm text-gray-600">Darbuotojas: {selectedEmployee.name}</p>
                        </CardHeader>
                        <CardContent className="space-y-4 p-4">
                          {/* Current Permissions */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Priskirtos teisių grupės ({selectedEmployee.permissions.length})
                            </h4>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {selectedEmployee.permissions.map((permission, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-green-100 text-green-800 text-xs px-2 py-1"
                                >
                                  ✓ {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Permission Assignment */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">Galimi veiksmai sistemoje</h4>
                            <div className="space-y-2 max-h-[calc(100vh-500px)] overflow-y-auto">
                              {permissionGroups.map((group) => {
                                const isAssigned = selectedEmployee.permissions.some((p) => p === group.name)
                                return (
                                  <div key={group.id} className="border rounded p-2">
                                    <div className="flex items-start gap-2">
                                      <Checkbox
                                        id={group.id}
                                        checked={isAssigned}
                                        onCheckedChange={(checked) =>
                                          handlePermissionChange(group.id, checked as boolean)
                                        }
                                        className="mt-0.5"
                                      />
                                      <div className="flex-1">
                                        <Label htmlFor={group.id} className="text-sm font-medium cursor-pointer">
                                          {group.name}
                                        </Label>
                                        <p className="text-xs text-gray-600 mt-0.5">{group.description}</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {group.permissions.map((permission, index) => (
                                            <span
                                              key={index}
                                              className="text-xs bg-gray-100 text-gray-700 px-1 py-0.5 rounded"
                                            >
                                              {permission}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}

                              {/* Custom Permissions Section */}
                              <div className="border rounded p-2 bg-blue-50">
                                <div className="flex items-start gap-2">
                                  <Checkbox
                                    id="custom-permissions"
                                    checked={selectedEmployee.customPermissions.length > 0}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setIsCustomPermissionsOpen(true)
                                      }
                                    }}
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="custom-permissions" className="text-sm font-medium cursor-pointer">
                                      Custom teisių grupė
                                    </Label>
                                    <p className="text-xs text-gray-600 mt-0.5">Individualūs leidimai darbuotojui</p>
                                    {selectedEmployee.customPermissions.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedEmployee.customPermissions.map((permission, index) => (
                                          <span
                                            key={index}
                                            className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded"
                                          >
                                            {permission}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button variant="outline" className="h-8 text-sm">
                              Atšaukti
                            </Button>
                            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 h-8 text-sm">
                              Išsaugoti pakeitimus
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="h-full flex items-center justify-center">
                        <CardContent>
                          <div className="text-center text-gray-500">
                            <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm">
                              Pasirinkite darbuotoją iš sąrašo, kad galėtumėte valdyti jo teises
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Custom Permissions Dialog */}
                <Dialog open={isCustomPermissionsOpen} onOpenChange={setIsCustomPermissionsOpen}>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-base">Custom teisių grupė</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      <p className="text-sm text-gray-600">Pasirinkite individualias teises darbuotojui:</p>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {allPermissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={`custom-${permission}`}
                              checked={customPermissions.includes(permission)}
                              onCheckedChange={(checked) =>
                                handleCustomPermissionChange(permission, checked as boolean)
                              }
                            />
                            <Label htmlFor={`custom-${permission}`} className="text-sm">
                              {permission}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setIsCustomPermissionsOpen(false)}
                          className="h-8 text-sm"
                        >
                          Atšaukti
                        </Button>
                        <Button
                          onClick={() => {
                            console.log("Custom permissions:", customPermissions)
                            setIsCustomPermissionsOpen(false)
                          }}
                          className="bg-yellow-400 text-black hover:bg-yellow-500 h-8 text-sm"
                        >
                          Išsaugoti
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Bulk Custom Permissions Dialog */}
                <Dialog open={isBulkCustomPermissionsOpen} onOpenChange={setIsBulkCustomPermissionsOpen}>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-base">Custom teisės pareigybei</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      <p className="text-sm text-gray-600">Pasirinkite custom teises pareigybei:</p>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {allPermissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={`bulk-custom-${permission}`}
                              checked={bulkUpdate.customPermissions.includes(permission)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setBulkUpdate({
                                    ...bulkUpdate,
                                    customPermissions: [...bulkUpdate.customPermissions, permission],
                                  })
                                } else {
                                  setBulkUpdate({
                                    ...bulkUpdate,
                                    customPermissions: bulkUpdate.customPermissions.filter((p) => p !== permission),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`bulk-custom-${permission}`} className="text-sm">
                              {permission}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setIsBulkCustomPermissionsOpen(false)}
                          className="h-8 text-sm"
                        >
                          Atšaukti
                        </Button>
                        <Button
                          onClick={() => {
                            console.log("Bulk custom permissions:", bulkUpdate.customPermissions)
                            setIsBulkCustomPermissionsOpen(false)
                          }}
                          className="bg-yellow-400 text-black hover:bg-yellow-500 h-8 text-sm"
                        >
                          Išsaugoti
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="teisiu-grupes" className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-medium">Teisių grupių valdymas</h3>
                    <p className="text-sm text-gray-600">Valdykite teisių grupes ir jų galimybes</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {permissionGroups.map((group) => (
                    <Card key={group.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{group.name}</CardTitle>
                          {group.editable && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedGroup(group)
                                setIsEditGroupOpen(true)
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Settings className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{group.description}</p>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div>
                            <h5 className="text-xs font-medium mb-1">Galimybės</h5>
                            <div className="space-y-0.5">
                              {group.permissions.map((permission, index) => (
                                <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  {permission}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Group Dialog */}
                <Dialog open={isEditGroupOpen} onOpenChange={setIsEditGroupOpen}>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-base">Redaguoti teisių grupę</DialogTitle>
                    </DialogHeader>
                    {selectedGroup && (
                      <div className="space-y-4 py-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">{selectedGroup.name}</h4>
                          <p className="text-sm text-gray-600 mb-4">{selectedGroup.description}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Galimybės</Label>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {allPermissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`edit-${permission}`}
                                  checked={selectedGroup.permissions.includes(permission)}
                                  onCheckedChange={(checked) => {
                                    console.log(
                                      `${checked ? "Adding" : "Removing"} ${permission} from ${selectedGroup.name}`,
                                    )
                                  }}
                                />
                                <Label htmlFor={`edit-${permission}`} className="text-sm">
                                  {permission}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t">
                          <Button variant="outline" onClick={() => setIsEditGroupOpen(false)} className="h-8 text-sm">
                            Atšaukti
                          </Button>
                          <Button
                            onClick={() => {
                              console.log("Saving group changes:", selectedGroup)
                              setIsEditGroupOpen(false)
                            }}
                            className="bg-yellow-400 text-black hover:bg-yellow-500 h-8 text-sm"
                          >
                            Išsaugoti pakeitimus
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Upload, Download, Trash2, Edit, Plus, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Mock SKU data
const mockSKUs = [
  {
    code: "1009",
    description: "PET CARE 1009",
    category: "Pet Food",
    uom: "Case",
    cost: "$12.50",
    shelfLife: 365,
    minOrder: 100,
    safety: 500,
    leadTime: 7,
    abc: "A",
    status: "Active",
    updated: "2025-10-15",
  },
  {
    code: "2034",
    description: "BEVERAGE 2034",
    category: "Soft Drink",
    uom: "Pallet",
    cost: "$450.00",
    shelfLife: 180,
    minOrder: 5,
    safety: 20,
    leadTime: 3,
    abc: "B",
    status: "Active",
    updated: "2025-10-14",
  },
  {
    code: "1010",
    description: "CAT FOOD PREMIUM",
    category: "Pet Food",
    uom: "Case",
    cost: "$18.75",
    shelfLife: 365,
    minOrder: 50,
    safety: 300,
    leadTime: 7,
    abc: "A",
    status: "Active",
    updated: "2025-10-13",
  },
  {
    code: "2035",
    description: "LEMON SODA 500ML",
    category: "Beverage",
    uom: "Case",
    cost: "$8.25",
    shelfLife: 180,
    minOrder: 100,
    safety: 400,
    leadTime: 5,
    abc: "B",
    status: "Active",
    updated: "2025-10-12",
  },
  {
    code: "3021",
    description: "LAUNDRY DETERGENT",
    category: "Household",
    uom: "Pallet",
    cost: "$380.00",
    shelfLife: 730,
    minOrder: 10,
    safety: 50,
    leadTime: 14,
    abc: "A",
    status: "Active",
    updated: "2025-10-11",
  },
];

export default function DataConfiguration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === mockSKUs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockSKUs.map((sku) => sku.code));
    }
  };

  const toggleRow = (code: string) => {
    if (selectedRows.includes(code)) {
      setSelectedRows(selectedRows.filter((c) => c !== code));
    } else {
      setSelectedRows([...selectedRows, code]);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              Data & Configuration Management
            </h1>
            <p className="text-muted-foreground">
              Home &gt; Decision Intelligence &gt; Data & Configuration
            </p>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="master" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="master">Master Data</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="parameters">Parameters</TabsTrigger>
              <TabsTrigger value="model">Model Configuration</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="master" className="space-y-6">
              {/* Sub-tabs for Master Data */}
              <Tabs defaultValue="skus" className="w-full">
                <TabsList>
                  <TabsTrigger value="skus">SKUs</TabsTrigger>
                  <TabsTrigger value="locations">Locations</TabsTrigger>
                  <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </TabsList>

                <TabsContent value="skus" className="space-y-4">
                  {/* Toolbar */}
                  <div className="flex flex-wrap gap-4 items-center justify-between bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search SKUs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                      </Button>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Bulk Upload
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button
                        variant="outline"
                        disabled={selectedRows.length === 0}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </Button>
                      <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[50px]">
                            <Checkbox
                              checked={selectedRows.length === mockSKUs.length}
                              onCheckedChange={toggleSelectAll}
                            />
                          </TableHead>
                          <TableHead className="font-semibold">SKU Code</TableHead>
                          <TableHead className="font-semibold">Description</TableHead>
                          <TableHead className="font-semibold">Category</TableHead>
                          <TableHead className="font-semibold">UoM</TableHead>
                          <TableHead className="font-semibold">Unit Cost</TableHead>
                          <TableHead className="font-semibold">Shelf Life</TableHead>
                          <TableHead className="font-semibold">Min Order</TableHead>
                          <TableHead className="font-semibold">Safety Stock</TableHead>
                          <TableHead className="font-semibold">Lead Time</TableHead>
                          <TableHead className="font-semibold">ABC</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Updated</TableHead>
                          <TableHead className="font-semibold text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockSKUs.map((sku) => (
                          <TableRow
                            key={sku.code}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedRows.includes(sku.code)}
                                onCheckedChange={() => toggleRow(sku.code)}
                              />
                            </TableCell>
                            <TableCell className="font-mono font-semibold">
                              {sku.code}
                            </TableCell>
                            <TableCell>{sku.description}</TableCell>
                            <TableCell>{sku.category}</TableCell>
                            <TableCell>{sku.uom}</TableCell>
                            <TableCell className="font-semibold">{sku.cost}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {sku.shelfLife} days
                            </TableCell>
                            <TableCell className="text-right">
                              {sku.minOrder}
                            </TableCell>
                            <TableCell className="text-right">{sku.safety}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {sku.leadTime} days
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  sku.abc === "A"
                                    ? "default"
                                    : sku.abc === "B"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {sku.abc}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-success/10 text-success hover:bg-success/20">
                                {sku.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {sku.updated}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Table Footer */}
                  <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">
                      Showing <span className="font-semibold text-foreground">5</span> of{" "}
                      <span className="font-semibold text-foreground">127</span> SKUs
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" disabled>
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="locations">
                  <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-12 text-center">
                    <p className="text-muted-foreground">Location master data table</p>
                  </div>
                </TabsContent>

                <TabsContent value="suppliers">
                  <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-12 text-center">
                    <p className="text-muted-foreground">Supplier master data table</p>
                  </div>
                </TabsContent>

                <TabsContent value="customers">
                  <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-12 text-center">
                    <p className="text-muted-foreground">Customer master data table</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="transactions">
              <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-12 text-center">
                <p className="text-muted-foreground">Transaction history and logs</p>
              </div>
            </TabsContent>

            <TabsContent value="parameters">
              <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-12 text-center">
                <p className="text-muted-foreground">System parameters configuration</p>
              </div>
            </TabsContent>

            <TabsContent value="model">
              <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-12 text-center">
                <p className="text-muted-foreground">AI model configuration and training</p>
              </div>
            </TabsContent>

            <TabsContent value="integrations">
              <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-12 text-center">
                <p className="text-muted-foreground">External system integrations</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

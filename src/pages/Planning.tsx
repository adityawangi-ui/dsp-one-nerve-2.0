import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Planning() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20 p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              Supply Chain Planning
            </h1>
            <p className="text-muted-foreground">
              Home &gt; Decision Intelligence &gt; Planning
            </p>
          </div>

          {/* Top Control Bar */}
          <div className="flex flex-wrap gap-4 mb-6 items-center bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-4">
            <Select defaultValue="baseline">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Scenario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baseline">Baseline</SelectItem>
                <SelectItem value="optimistic">Optimistic</SelectItem>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 bg-muted p-1 rounded-lg">
              <Button variant="ghost" size="sm" className="data-[state=active]:bg-background">
                4 weeks
              </Button>
              <Button variant="ghost" size="sm" className="data-[state=active]:bg-background">
                8 weeks
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-background data-[state=active]:bg-background"
              >
                12 weeks
              </Button>
              <Button variant="ghost" size="sm" className="data-[state=active]:bg-background">
                26 weeks
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-semibold px-4">October 2025</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="ml-auto flex gap-2">
              <Button>Solve</Button>
              <Button variant="outline">Export Plan</Button>
            </div>
          </div>

          {/* Three Panel Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Panel: SKU Selector */}
            <Card className="col-span-12 lg:col-span-3 p-4 max-h-[600px] overflow-y-auto">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search SKUs..." className="pl-9" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-sm text-foreground mb-2">Product Families</div>
                <div className="space-y-1">
                  <div className="p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                    <div className="font-medium text-sm">Beverages</div>
                    <div className="ml-4 mt-1 space-y-1 text-sm text-muted-foreground">
                      <div className="hover:text-foreground cursor-pointer">SKU 2034 - Cola 500ml</div>
                      <div className="hover:text-foreground cursor-pointer">
                        SKU 2035 - Lemon Soda 500ml
                      </div>
                    </div>
                  </div>
                  <div className="p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors bg-primary/5 border border-primary/20">
                    <div className="font-medium text-sm text-primary">Pet Food</div>
                    <div className="ml-4 mt-1 space-y-1 text-sm">
                      <div className="text-primary font-medium cursor-pointer">
                        SKU 1009 - PET CARE 1009
                      </div>
                      <div className="text-muted-foreground hover:text-foreground cursor-pointer">
                        SKU 1010 - Cat Food Premium
                      </div>
                    </div>
                  </div>
                  <div className="p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                    <div className="font-medium text-sm">Snacks</div>
                  </div>
                  <div className="p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                    <div className="font-medium text-sm">Household Care</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs font-semibold text-muted-foreground mb-2">FILTERS</div>
                <div className="space-y-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="l002">L002</SelectItem>
                      <SelectItem value="l005">L005</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="risk">At Risk</SelectItem>
                      <SelectItem value="healthy">Healthy</SelectItem>
                      <SelectItem value="shortage">Shortage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Center Panel: Planning Grid */}
            <Card className="col-span-12 lg:col-span-6 p-4">
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">
                  SKU 1009 - PET CARE 1009 <span className="text-muted-foreground">@ All Locations</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-semibold text-foreground">Metric</th>
                      <th className="text-right p-2 font-semibold text-foreground">Week 43</th>
                      <th className="text-right p-2 font-semibold text-foreground">Week 44</th>
                      <th className="text-right p-2 font-semibold text-foreground">Week 45</th>
                      <th className="text-right p-2 font-semibold text-foreground">Week 46</th>
                      <th className="text-right p-2 font-semibold text-foreground">Week 47</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground">Beginning Inventory</td>
                      <td className="p-2 text-right">5,341</td>
                      <td className="p-2 text-right">5,602</td>
                      <td className="p-2 text-right">4,657</td>
                      <td className="p-2 text-right">3,737</td>
                      <td className="p-2 text-right">2,817</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground">Receipts</td>
                      <td className="p-2 text-right">1,200</td>
                      <td className="p-2 text-right">0</td>
                      <td className="p-2 text-right">0</td>
                      <td className="p-2 text-right">0</td>
                      <td className="p-2 text-right">0</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground">Demand</td>
                      <td className="p-2 text-right">939</td>
                      <td className="p-2 text-right">945</td>
                      <td className="p-2 text-right">920</td>
                      <td className="p-2 text-right">920</td>
                      <td className="p-2 text-right">925</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground">Ending Inventory</td>
                      <td className="p-2 text-right font-semibold">5,602</td>
                      <td className="p-2 text-right font-semibold">4,657</td>
                      <td className="p-2 text-right font-semibold">3,737</td>
                      <td className="p-2 text-right font-semibold">2,817</td>
                      <td className="p-2 text-right font-semibold">1,892</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground">Safety Stock</td>
                      <td className="p-2 text-right">500</td>
                      <td className="p-2 text-right">500</td>
                      <td className="p-2 text-right">500</td>
                      <td className="p-2 text-right">500</td>
                      <td className="p-2 text-right">500</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-muted-foreground font-medium">Coverage (Days)</td>
                      <td
                        className={cn(
                          "p-2 text-right font-bold rounded",
                          "bg-success/10 text-success"
                        )}
                      >
                        45
                      </td>
                      <td
                        className={cn(
                          "p-2 text-right font-bold rounded",
                          "bg-success/10 text-success"
                        )}
                      >
                        38
                      </td>
                      <td
                        className={cn(
                          "p-2 text-right font-bold rounded",
                          "bg-warning/10 text-warning"
                        )}
                      >
                        31
                      </td>
                      <td
                        className={cn(
                          "p-2 text-right font-bold rounded",
                          "bg-warning/10 text-warning"
                        )}
                      >
                        23
                      </td>
                      <td
                        className={cn(
                          "p-2 text-right font-bold rounded",
                          "bg-destructive/10 text-destructive"
                        )}
                      >
                        15
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Right Panel: Alerts */}
            <Card className="col-span-12 lg:col-span-3 p-4 max-h-[600px] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Planning Exceptions</h3>
                <Badge variant="destructive">4</Badge>
              </div>

              <div className="space-y-3">
                <Card className="p-3 border-l-4 border-l-destructive bg-destructive/5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">Projected Stockout</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        SKU 1009 at L002 - Week 52
                      </div>
                      <Button size="sm" className="mt-2 h-7 text-xs">
                        Create Transfer
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 border-l-4 border-l-warning bg-warning/5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">Excess Inventory</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        SKU 2034 at L017 - 58 days coverage
                      </div>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        Optimize
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 border-l-4 border-l-warning bg-warning/5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">
                        Safety Stock Breach
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        SKU 1010 at L005 - Below minimum
                      </div>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        Replenish
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 border-l-4 border-l-destructive bg-destructive/5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">Demand Spike</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        SKU 2035 - 45% above forecast
                      </div>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        Adjust Plan
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3 justify-end">
            <Button>Generate Transfer Recommendations</Button>
            <Button>Run Optimization</Button>
            <Button variant="outline">Save Scenario</Button>
            <Button variant="outline">Share with Team</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

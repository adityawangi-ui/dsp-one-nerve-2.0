import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { Factory, Package, Truck, RefreshCw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface Props { row: RiskRow; }

function ControlSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-xl p-5 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default function PlannerInputTab({ row }: Props) {
  const [extraShift, setExtraShift] = useState(false);
  const [transshipment, setTransshipment] = useState(false);
  const [skuSubstitution, setSkuSubstitution] = useState(false);
  const [productionAdj, setProductionAdj] = useState([50]);
  const [rebalanceQty, setRebalanceQty] = useState("2500");
  const [lineAllocation, setLineAllocation] = useState("PU2");
  const [transportMode, setTransportMode] = useState("road");
  const [warehouse, setWarehouse] = useState("DC-North");
  const [substituteProduct, setSubstituteProduct] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      toast.success("Simulation complete — New scenario generated based on planner inputs");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Production Controls */}
        <ControlSection icon={Factory} title="Production">
          <div>
            <Label className="text-xs text-muted-foreground">Production Schedule Adjustment</Label>
            <div className="mt-2">
              <Slider value={productionAdj} onValueChange={setProductionAdj} min={0} max={100} step={5} />
              <p className="text-xs text-muted-foreground mt-1">{productionAdj[0]}% capacity utilization</p>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Line Allocation</Label>
            <Select value={lineAllocation} onValueChange={setLineAllocation}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="PU1">PU1 - Primary</SelectItem>
                <SelectItem value="PU2">PU2 - Secondary</SelectItem>
                <SelectItem value="PU3">PU3 - Backup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Add Extra Shift</Label>
            <Switch checked={extraShift} onCheckedChange={setExtraShift} />
          </div>
        </ControlSection>

        {/* Inventory Controls */}
        <ControlSection icon={Package} title="Inventory">
          <div>
            <Label className="text-xs text-muted-foreground">Stock Rebalancing Quantity</Label>
            <Input value={rebalanceQty} onChange={e => setRebalanceQty(e.target.value)} className="mt-1" type="number" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Target Warehouse</Label>
            <Select value={warehouse} onValueChange={setWarehouse}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="DC-North">DC-North</SelectItem>
                <SelectItem value="DC-South">DC-South</SelectItem>
                <SelectItem value="DC-Central">DC-Central</SelectItem>
                <SelectItem value="DC-East">DC-East</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ControlSection>

        {/* Logistics Controls */}
        <ControlSection icon={Truck} title="Logistics">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Enable Transshipment</Label>
            <Switch checked={transshipment} onCheckedChange={setTransshipment} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Transport Mode</Label>
            <Select value={transportMode} onValueChange={setTransportMode}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="road">Road</SelectItem>
                <SelectItem value="rail">Rail</SelectItem>
                <SelectItem value="air">Air (Express)</SelectItem>
                <SelectItem value="sea">Sea</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ControlSection>

        {/* Substitution Controls */}
        <ControlSection icon={RefreshCw} title="Substitution">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Enable SKU Substitution</Label>
            <Switch checked={skuSubstitution} onCheckedChange={setSkuSubstitution} />
          </div>
          {skuSubstitution && (
            <div>
              <Label className="text-xs text-muted-foreground">Substitute Product</Label>
              <Select value={substituteProduct} onValueChange={setSubstituteProduct}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select product..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="SKU-ALT-001">Dove Body Wash 500ml (ALT)</SelectItem>
                  <SelectItem value="SKU-ALT-002">Dove Sensitive 250ml (ALT)</SelectItem>
                  <SelectItem value="SKU-ALT-003">Dove Original Bar 100g (ALT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </ControlSection>
      </div>

      {/* Run Simulation */}
      <div className="flex justify-center">
        <Button onClick={runSimulation} disabled={isSimulating} size="lg" className="gap-2 px-8 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          {isSimulating ? (
            <><RefreshCw className="h-4 w-4 animate-spin" /> Running Simulation...</>
          ) : (
            <><Play className="h-4 w-4" /> Run Simulation</>
          )}
        </Button>
      </div>
    </div>
  );
}

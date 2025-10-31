import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, TrendingUp, Truck, Package } from "lucide-react";

export interface Decision {
  id: string;
  recommendation: string;
  type: string;
  fromLocation: string;
  toLocation: string;
  inventorySavings: string;
  serviceRisk: string;
  truckNumber: string;
  pallets: number;
  calendarDay: string;
}

interface DecisionTableProps {
  decisions: Decision[];
  onDecisionClick: (decision: Decision) => void;
  onAccept: (decisionId: string) => void;
  onDismiss: (decisionId: string) => void;
  onModify: (decisionId: string) => void;
}

export const DecisionTable = ({
  decisions,
  onDecisionClick,
  onAccept,
  onDismiss,
  onModify,
}: DecisionTableProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-[var(--shadow-card)] overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-[var(--shadow-glow)]" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border/50 bg-muted/30">
            <TableHead className="font-semibold text-foreground">Recommendation</TableHead>
            <TableHead className="font-semibold text-foreground">Type</TableHead>
            <TableHead className="font-semibold text-foreground">From</TableHead>
            <TableHead className="font-semibold text-foreground">To</TableHead>
            <TableHead className="font-semibold text-foreground">Inventory Savings</TableHead>
            <TableHead className="font-semibold text-foreground">Service Risk Reduction</TableHead>
            <TableHead className="font-semibold text-foreground">Truck</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Pallets</TableHead>
            <TableHead className="font-semibold text-foreground">Date</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {decisions.map((decision) => (
            <TableRow
              key={decision.id}
              className="cursor-pointer hover:bg-muted/50 transition-all duration-300 hover:shadow-sm group"
              onClick={() => onDecisionClick(decision)}
            >
              <TableCell className="font-medium max-w-xs group-hover:text-primary transition-colors">{decision.recommendation}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                  {decision.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {decision.fromLocation}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {decision.toLocation}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 font-semibold text-success">
                  <TrendingUp className="h-4 w-4" />
                  {decision.inventorySavings}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 font-semibold text-success">
                  <TrendingUp className="h-4 w-4" />
                  {decision.serviceRisk}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono transition-all duration-300 group-hover:border-primary/50">
                  <Truck className="h-3 w-3 mr-1" />
                  {decision.truckNumber}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold">
                <div className="flex items-center justify-end gap-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  {decision.pallets}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{decision.calendarDay}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => onAccept(decision.id)}
                    className="h-8 transition-all duration-300 hover:scale-105"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDismiss(decision.id)}
                    className="h-8 transition-all duration-300 hover:scale-105"
                  >
                    Dismiss
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onModify(decision.id)}
                    className="h-8 transition-all duration-300 hover:scale-105"
                  >
                    Modify
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

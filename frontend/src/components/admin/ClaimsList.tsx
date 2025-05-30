
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Claim {
  id: string;
  userName: string;
  problem: string;
  request: string;
  status: "pending" | "resolved" | "processing";
}

const mockClaims: Claim[] = [
  {
    id: "1",
    userName: "Jean Dupont",
    problem: "Problème de paiement",
    request: "Remboursement",
    status: "pending"
  },
  {
    id: "2",
    userName: "Marie Martin",
    problem: "Article non conforme",
    request: "Annulation de l'enchère",
    status: "processing"
  }
];

const ClaimsList = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Problème</TableHead>
            <TableHead>Demande</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockClaims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>{claim.userName}</TableCell>
              <TableCell>{claim.problem}</TableCell>
              <TableCell>{claim.request}</TableCell>
              <TableCell>
                <Badge variant={
                  claim.status === "pending" ? "destructive" : 
                  claim.status === "processing" ? "default" : 
                  "secondary"
                }>
                  {claim.status === "pending" ? "En attente" : 
                   claim.status === "processing" ? "En traitement" : 
                   "Résolu"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClaimsList;
